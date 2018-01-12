// CONSTANTS

export const SOCKET_REQUEST_CONNECT = 'SOCKET_REQUEST_CONNECT';
export const SOCKET_CONNECTION_OPEN = 'SOCKET_CONNECTION_OPEN';
export const SOCKET_CONNECTION_ERROR = 'SOCKET_CONNECTION_ERROR';
export const SOCKET_CONNECTION_CLOSE = 'SOCKET_CONNECTION_CLOSE';
export const LOBBY_REQUEST_JOIN = 'LOBBY_REQUEST_JOIN';
export const LOBBY_REQUEST_ERROR = 'LOBBY_REQUEST_ERROR';
export const LOBBY_REQUEST_TIMEOUT = 'LOBBY_REQUEST_TIMEOUT';
export const LOBBY_OPEN = 'LOBBY_OPEN';
export const LOBBY_ERROR = 'LOBBY_ERROR';
export const LOBBY_CLOSE = 'LOBBY_CLOSE';
// Lobby channel actions
export const CREATE_GAME = 'create_game';

// ACTIONS

export const actions = {
  openConnection: () => ({ type: SOCKET_REQUEST_CONNECT }),
  onSocketOpen: socket => ({ type: SOCKET_CONNECTION_OPEN, payload: socket }),
  onSocketClose: () => ({ type: SOCKET_CONNECTION_CLOSE }),
  onSocketError: error => ({ type: SOCKET_CONNECTION_ERROR, payload: error }),
  joinLobby: () => ({ type: LOBBY_REQUEST_JOIN }),
  onLobbyJoinError: error => ({ type: LOBBY_REQUEST_ERROR, payload: error }),
  onLobbyJoinTimeout: error => ({ type: LOBBY_REQUEST_TIMEOUT, payload: error }),
  onLobbyOpen: channel => ({ type: LOBBY_OPEN, payload: channel }),
  onLobbyClose: () => ({ type: LOBBY_CLOSE }),
  onLobbyError: error => ({ type: LOBBY_ERROR, payload: error }),
  // Lobby channel actions, check middleware
  createGame: () => ({ type: CREATE_GAME }),
};


// REDUCER

const initialState = {
  connecting: false,
  error: null,
  socket: null,
  lobbyChannel: null,
};

export function connection(state = initialState, action) {
  switch (action.type) {
    case SOCKET_REQUEST_CONNECT:
      return {
        ...state,
        connecting: true,
        error: null,
      };
    case SOCKET_CONNECTION_OPEN:
      return {
        ...state,
        error: null,
        connecting: false,
        socket: action.payload,
      };
    case SOCKET_CONNECTION_CLOSE:
      return {
        ...state,
        error: null,
        connecting: false,
        socket: null,
      };
    case SOCKET_CONNECTION_ERROR:
      return {
        ...state,
        connecting: false,
        error: action.payload,
        socket: null,
      };
    case LOBBY_REQUEST_JOIN:
      return {
        ...state,
        connecting: true,
      };
    case LOBBY_OPEN:
      return {
        ...state,
        connecting: false,
        error: null,
        lobbyChannel: action.payload,
      };
    case LOBBY_REQUEST_ERROR:
      return {
        ...state,
        connecting: false,
        error: action.payload,
        lobbyChannel: null,
      };
    case LOBBY_REQUEST_TIMEOUT:
      return {
        ...state,
        connecting: false,
        error: action.payload,
        lobbyChannel: null,
      };
    case LOBBY_CLOSE:
      return {
        ...state,
        connecting: false,
        error: null,
        lobbyChannel: null,
      };
    case LOBBY_ERROR:
      return {
        ...state,
        connecting: false,
        error: action.payload,
        lobbyChannel: null,
      };
    default:
      return state;
  }
}
