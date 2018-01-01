import { getType, createAction } from 'typesafe-actions';

// CONSTANTS

export const OPEN_SOCKET_CONNECTION = 'OPEN_SOCKET_CONNECTION';
export const SOCKET_CONNECTION_OPEN = 'SOCKET_CONNECTION_OPEN';
export const SOCKET_CONNECTION_ERROR = 'SOCKET_CONNECTION_ERROR';
export const SOCKET_CONNECTION_CLOSE = 'SOCKET_CONNECTION_CLOSE';
export const SOCKET_JOIN_CHANNEL = 'SOCKET_JOIN_CHANNEL';
export const CHANNEL_CONNECTION_ERROR = 'CHANNEL_CONNECTION_ERROR';
export const CHANNEL_CONNECTION_CLOSE = 'CHANNEL_CONNECTION_CLOSE';

// ACTIONS

export const actions = {
  openConnection: createAction(OPEN_SOCKET_CONNECTION),
  onSocketOpen: createAction(SOCKET_CONNECTION_OPEN),
  onSocketError: createAction(SOCKET_CONNECTION_ERROR),
  onSocketClose: createAction(SOCKET_CONNECTION_CLOSE),
  joinChannel: createAction(SOCKET_JOIN_CHANNEL, (channel) => ({
    type: SOCKET_JOIN_CHANNEL,
    payload: channel,
  })),
  onChannelError: createAction(CHANNEL_CONNECTION_ERROR, (channel) => ({
    type: CHANNEL_CONNECTION_ERROR,
    payload: channel,
  })),
  onChannelClose: createAction(CHANNEL_CONNECTION_CLOSE, (channel) => ({
    type: CHANNEL_CONNECTION_CLOSE,
    payload: channel,
  })),
};

// REDUCER

const initialState = {
  isOpen: false,
  hasError: false,
  channels: [],
};

export function socket(state = initialState, action) {
  switch (action.type) {
    case getType(actions.openConnection):
      return {
        ...state,
        hasError: false,
      };
    case getType(actions.onSocketError):
      return {
        ...state,
        hasError: true,
      };
    case getType(actions.onSocketOpen):
      return {
        ...state,
        hasError: false,
        isOpen: true,
      };
    case getType(actions.onSocketClose):
      return {
        ...state,
        isOpen: true,
        hasError: false,
        channels: [],
      };
    case getType(actions.joinChannel):
      return {
        ...state,
        channels: state.channels.concat([action.payload]),
      };
    case getType(actions.onChannelClose):
      return {
        ...state,
        channels: state.channels.filter(channel => channel !== action.payload),
      };
    default:
      return state;
  }
}
