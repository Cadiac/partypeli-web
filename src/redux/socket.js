// CONSTANTS

export const SOCKET_REQUEST_CONNECT = 'SOCKET_REQUEST_CONNECT';
export const SOCKET_CONNECTION_OPEN = 'SOCKET_CONNECTION_OPEN';
export const SOCKET_CONNECTION_ERROR = 'SOCKET_CONNECTION_ERROR';
export const SOCKET_CONNECTION_CLOSE = 'SOCKET_CONNECTION_CLOSE';
export const CHANNEL_REQUEST_JOIN = 'CHANNEL_REQUEST_JOIN';
export const CHANNEL_REQUEST_ERROR = 'CHANNEL_REQUEST_ERROR';
export const CHANNEL_REQUEST_TIMEOUT = 'CHANNEL_REQUEST_TIMEOUT';
export const CHANNEL_OPEN = 'CHANNEL_OPEN';
export const CHANNEL_ERROR = 'CHANNEL_ERROR';
export const CHANNEL_CLOSE = 'CHANNEL_CLOSE';
export const USER_SET_LOBBY_ID = 'USER_SET_LOBBY_ID';

// ACTIONS

export const actions = {
  openConnection: () => ({ type: SOCKET_REQUEST_CONNECT }),
  onSocketOpen: () => ({ type: SOCKET_CONNECTION_OPEN }),
  onSocketClose: () => ({ type: SOCKET_CONNECTION_CLOSE }),
  onSocketError: () => ({ type: SOCKET_CONNECTION_ERROR }),
  joinChannel: channel => ({ type: CHANNEL_REQUEST_JOIN, payload: channel }),
  onChannelJoinError: channel => ({ type: CHANNEL_REQUEST_ERROR, payload: channel }),
  onChannelJoinTimeout: channel => ({ type: CHANNEL_REQUEST_TIMEOUT, payload: channel }),
  onChannelJoin: channel => ({ type: CHANNEL_OPEN, payload: channel }),
  onChannelClose: channel => ({ type: CHANNEL_CLOSE, payload: channel }),
  onChannelError: channel => ({ type: CHANNEL_ERROR, payload: channel }),
  setLobbyId: id => ({ type: USER_SET_LOBBY_ID, payload: id }),
};

// REDUCER

const initialState = {
  isOpen: false,
  connecting: false,
  hasError: false,
  channels: [],
  lobbyId: '',
};

export function socket(state = initialState, action) {
  switch (action.type) {
    case SOCKET_REQUEST_CONNECT:
      return {
        ...state,
        connecting: true,
        hasError: false,
      };
    case SOCKET_CONNECTION_OPEN:
      return {
        ...state,
        hasError: false,
        connecting: false,
        isOpen: true,
      };
    case SOCKET_CONNECTION_ERROR:
      return {
        ...state,
        connecting: false,
        hasError: true,
      };
    case SOCKET_CONNECTION_CLOSE:
      return {
        ...state,
        isOpen: true,
        hasError: false,
        connecting: false,
        channels: [],
      };
    case CHANNEL_REQUEST_JOIN:
      return {
        ...state,
        connecting: true,
      };
    case CHANNEL_OPEN:
      return {
        ...state,
        connecting: false,
        channels: state.channels.filter(channel => channel !== action.payload),
      };
    case CHANNEL_CLOSE:
      return {
        ...state,
        connecting: false,
        channels: state.channels.filter(channel => channel !== action.payload),
      };
    case CHANNEL_ERROR:
      return {
        ...state,
        hasError: true,
        connecting: false,
        channels: state.channels.filter(channel => channel !== action.payload),
      };
    case USER_SET_LOBBY_ID:
      return {
        ...state,
        lobbyId: action.payload,
      };

    default:
      return state;
  }
}
