// CONSTANTS

export const GAME_SET_GAME = 'GAME_SET_GAME';
export const GAME_SET_CHANNEL = 'GAME_SET_CHANNEL';

export const JOINED_GAME = 'game:joined';
export const GAME_PLAYER_CONNECTED = 'game:player_connected';
export const GAME_PLAYER_DISCONENCTED = 'game:player_disconnected';
export const GAME_GET_DATA = 'game:get_data';
export const GAME_SEND_MESSAGE = 'game:send_message';
export const GAME_MESSAGE_SENT = 'game:message_sent';
export const GAME_STOPPED = 'game:stopped';

// ACTIONS

export const actions = {
  playerConnected: message => ({ type: GAME_PLAYER_CONNECTED, payload: message.player }),
  playerDisconnected: message => ({ type: GAME_PLAYER_DISCONENCTED, payload: message.player }),
};

// REDUCER

const initialState = {
  gameChannel: null,
  game: null,
  messages: [],
  players: [],
};

export function game(state = initialState, action) {
  switch (action.type) {
    case GAME_SET_GAME:
      return {
        ...state,
        game: action.payload,
      };
    case GAME_SET_CHANNEL:
      return {
        ...state,
        gameChannel: action.payload,
      };
    case GAME_PLAYER_CONNECTED:
      return {
        ...state,
        players: state.players.concat(action.payload.player_id),
      };
    case GAME_PLAYER_DISCONENCTED:
      return {
        ...state,
        players: state.players.filter(player => player !== action.payload),
      };
    default:
      return state;
  }
}
