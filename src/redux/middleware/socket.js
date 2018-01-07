/* eslint-disable no-case-declarations */

import { Socket } from 'phoenix';
import { push } from 'react-router-redux';

import * as connection from '../connection';

import config from '../../utils/config';

const socketMiddleware = ({ dispatch, getState }) => next => (action) => {
  switch (action.type) {
    case connection.SOCKET_REQUEST_CONNECT:
      const newSocket = new Socket(`${config.apiUrl}/socket`, {
        logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); },
      });

      newSocket.onOpen(() => {
        dispatch(connection.actions.onSocketOpen(newSocket));
        dispatch(connection.actions.joinLobby());
      });
      newSocket.onError(error => dispatch(connection.actions.onSocketError(error)));
      newSocket.onClose(() => dispatch(connection.actions.onSocketClose()));

      newSocket.connect();
      break;

    case connection.LOBBY_REQUEST_JOIN:
      const { socket } = getState().connection;
      const channel = socket.channel('lobby');
      channel.join()
        .receive('ok', () => {
          dispatch(connection.actions.onLobbyOpen(channel));
        })
        .receive('error', error => dispatch(connection.actions.onLobbyJoinError(error)))
        .receive('timeout', error => dispatch(connection.actions.onLobbyJoinTimeout(error)));

      channel.onError(error => dispatch(connection.actions.onLobbyError(error)));
      channel.onClose(() => dispatch(connection.actions.onLobbyClose()));
      break;

    case connection.CREATE_GAME:
      const { lobbyChannel } = getState().connection;

      if (lobbyChannel) {
        lobbyChannel.push(connection.CREATE_GAME)
          .receive('ok', (payload) => {
            dispatch(push(`/game/${payload.game_id}`));
          });
      }
      break;

    default:
      break;
  }

  return next(action);
};

export default socketMiddleware;
