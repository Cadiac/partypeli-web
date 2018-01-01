// CONSTANTS

export const PLAYER_CONNECT = 'PLAYER_CONNECT';
export const PLAYER_DISCONNECT = 'PLAYER_DISCONNECT';

// ACTIONS

export const actions = {
  playerConnected: message => ({ type: PLAYER_CONNECT, payload: message.player }),
  playerDisconnected: message => ({ type: PLAYER_DISCONNECT, payload: message.player }),
};

// REDUCER

const initialState = {
  players: [],
};

export function game(state = initialState, action) {
  switch (action.type) {
    case PLAYER_CONNECT:
      return {
        ...state,
        players: state.players.concat(action.payload),
      };
    case PLAYER_DISCONNECT:
      return {
        ...state,
        players: state.players.filter(player => player !== action.payload),
      };
    default:
      return state;
  }
}
