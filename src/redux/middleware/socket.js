/* eslint-disable no-case-declarations */

import { Socket } from 'phoenix';
import * as socket from '../socket';
import config from '../../utils/config';

let currentSocket = null;

// This looks like shit but works
const socketMiddleware = ({ dispatch, getState }) => next => (action) => {
  switch (action.type) {
    case socket.SOCKET_REQUEST_CONNECT:
      currentSocket = new Socket(`${config.apiUrl}/socket`, { params: { token: 'token' } });
      currentSocket.onOpen(() => dispatch(socket.actions.onSocketOpen()));
      currentSocket.onError(() => dispatch(socket.actions.onSocketError()));
      currentSocket.onClose(() => dispatch(socket.actions.onSocketClose()));

      currentSocket.connect();
      break;

    case socket.SOCKET_CONNECTION_OPEN:
      const { lobbyId } = getState().socket;
      dispatch(socket.actions.joinChannel(lobbyId));
      break;

    case socket.CHANNEL_REQUEST_JOIN:
      const channel = currentSocket.channel(action.payload, {});
      channel.join()
        .receive('ok', () => dispatch(socket.actions.onChannelJoin(channel)));

      channel.onError(() => dispatch(socket.actions.onChannelError(action.payload)));
      channel.onClose(() => dispatch(socket.actions.onChannelClose(action.payload)));
      break;

    default:
      break;
  }

  return next(action);
};

export default socketMiddleware;
