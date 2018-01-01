// CONSTANTS

export const SOCKET_REQUEST_CONNECT = 'SOCKET_REQUEST_CONNECT';
export const SOCKET_CONNECTION_OPEN = 'SOCKET_CONNECTION_OPEN';
export const SOCKET_CONNECTION_ERROR = 'SOCKET_CONNECTION_ERROR';
export const SOCKET_CONNECTION_CLOSE = 'SOCKET_CONNECTION_CLOSE';
export const CHANNEL_REQUEST_JOIN = 'CHANNEL_REQUEST_JOIN';
export const CHANNEL_CONNECTION_ERROR = 'CHANNEL_CONNECTION_ERROR';
export const CHANNEL_CONNECTION_CLOSE = 'CHANNEL_CONNECTION_CLOSE';
export const CHANNEL_CONNECTION_OPEN = 'CHANNEL_CONNECTION_OPEN';
export const USER_SET_LOBBY_ID = 'USER_SET_LOBBY_ID';

// ACTIONS

export const actions = {
  openConnection: () => ({ type: SOCKET_REQUEST_CONNECT }),
  onSocketOpen: () => ({ type: SOCKET_CONNECTION_OPEN }),
  onSocketClose: () => ({ type: SOCKET_CONNECTION_CLOSE }),
  onSocketError: () => ({ type: SOCKET_CONNECTION_ERROR }),
  joinChannel: channel => ({ type: CHANNEL_REQUEST_JOIN, payload: channel }),
  onChannelJoin: channel => ({ type: CHANNEL_CONNECTION_OPEN, payload: channel }),
  onChannelClose: channel => ({ type: CHANNEL_CONNECTION_CLOSE, payload: channel }),
  onChannelError: channel => ({ type: CHANNEL_CONNECTION_ERROR, payload: channel }),
  setLobbyId: id => ({ type: USER_SET_LOBBY_ID, payload: id }),
};

// REDUCER

const initialState = {
  isOpen: false,
  hasError: false,
  channels: [],
  lobbyId: '',
};

export function socket(state = initialState, action) {
  switch (action.type) {
    case SOCKET_REQUEST_CONNECT:
      return {
        ...state,
        hasError: false,
      };
    case SOCKET_CONNECTION_OPEN:
      return {
        ...state,
        hasError: false,
        isOpen: true,
      };
    case SOCKET_CONNECTION_ERROR:
      return {
        ...state,
        hasError: true,
      };
    case SOCKET_CONNECTION_CLOSE:
      return {
        ...state,
        isOpen: true,
        hasError: false,
        channels: [],
      };
    case CHANNEL_REQUEST_JOIN:
      return {
        ...state,
      };
    case CHANNEL_CONNECTION_OPEN:
      return {
        ...state,
        channels: state.channels.filter(channel => channel !== action.payload),
      };
    case CHANNEL_CONNECTION_CLOSE:
      return {
        ...state,
        channels: state.channels.filter(channel => channel !== action.payload),
      };
    case CHANNEL_CONNECTION_ERROR:
      return {
        ...state,
        hasError: true,
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
