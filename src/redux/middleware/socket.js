/* eslint-disable no-case-declarations */

import { Socket } from 'phoenix';
import { push } from 'react-router-redux';

import * as socket from '../socket';
import * as game from '../game';
import config from '../../utils/config';

let currentSocket = null;

// This looks like shit but works
const socketMiddleware = ({ dispatch }) => next => (action) => {
  switch (action.type) {
    case socket.SOCKET_REQUEST_CONNECT:
      currentSocket = new Socket(`${config.apiUrl}/socket`, { params: { token: 'token' } });
      currentSocket.onOpen(() => dispatch(socket.actions.onSocketOpen()));
      currentSocket.onError(() => dispatch(socket.actions.onSocketError()));
      currentSocket.onClose(() => dispatch(socket.actions.onSocketClose()));

      currentSocket.connect();
      break;

    case socket.CHANNEL_REQUEST_JOIN:
      const channel = currentSocket.channel(action.payload, {});
      channel.join()
        .receive('ok', () => {
          dispatch(socket.actions.onChannelJoin(channel));
          dispatch(push(`/lobby/${action.payload}`));
        })
        .receive('error', () => dispatch(socket.actions.onChannelJoinError(channel)))
        .receive('timeout', () => dispatch(socket.actions.onChannelJoinTimeout(channel)));

      channel.onError(() => dispatch(socket.actions.onChannelError(action.payload)));
      channel.onClose(() => dispatch(socket.actions.onChannelClose(action.payload)));

      channel.on('player:connect', (message) => {
        dispatch(game.actions.playerConnected(message));
      });

      channel.on('player:disconnect', (message) => {
        dispatch(game.actions.playerDisconnected(message));
      });

      break;

    default:
      break;
  }

  return next(action);
};

export default socketMiddleware;
