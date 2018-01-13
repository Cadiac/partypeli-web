import { push } from 'react-router-redux';
import { createSelector } from 'reselect';

// CONSTANTS

export const GAME_SET_USERNAME = 'GAME_SET_USERNAME';
export const GAME_SET_GAME_ID = 'GAME_SET_GAME_ID';
export const GAME_SET_GAME = 'GAME_SET_GAME';
export const GAME_SET_CHANNEL = 'GAME_SET_CHANNEL';
export const GAME_PLAYERS_UPDATED = 'GAME_PLAYERS_UPDATED';

// These are actions broadcastd by the server
export const GAME_PLAYER_CONNECTED = 'game:player_connected';
export const GAME_PLAYER_DISCONNECTED = 'game:player_disconnected';
export const GAME_MESSAGE_RECEIVED = 'game:message_received';
export const GAME_STOPPED = 'game:stopped';

// These are actions we send on the channel, and server replies to them.
export const GAME_GET_DATA = 'game:get_data';
export const GAME_GET_PLAYERS = 'game:get_players';
export const GAME_SEND_MESSAGE = 'game:send_message';

// ACTIONS

export const actions = {
  setUsername: username => ({ type: GAME_SET_USERNAME, payload: username }),
  setGameId: gameId => ({ type: GAME_SET_GAME_ID, payload: gameId }),
  setGame: gameState => ({ type: GAME_SET_GAME, payload: gameState }),
  setChannelAndGame: (channel, gameState) => (dispatch) => {
    dispatch({ type: GAME_SET_CHANNEL, payload: channel });
    dispatch(actions.setGame(gameState));
  },
  joinGame: (socket, gameId, username) => (dispatch) => {
    // Open game channel
    const channel = socket.channel(`game:${gameId}`, { username });

    channel.join()
      .receive('ok', (response) => {
        dispatch(actions.setChannelAndGame(channel, response.game));
      })
      .receive('error', (error) => {
        if (error.reason === 'No more players allowed') dispatch(push('/not_found'));
        if (error.reason === 'Game does not exist') dispatch(push('/not_found'));
      });

    // Dispatch actions based on received messages
    // and handle them at reducer level
    channel.on(GAME_PLAYER_CONNECTED, (payload) => {
      dispatch({ type: GAME_PLAYER_CONNECTED, payload });
    });

    channel.on(GAME_PLAYER_DISCONNECTED, (payload) => {
      dispatch({ type: GAME_PLAYER_DISCONNECTED, payload });
    });

    channel.on(GAME_MESSAGE_RECEIVED, (payload) => {
      dispatch({ type: GAME_MESSAGE_RECEIVED, payload });
    });

    channel.on(GAME_STOPPED, (payload) => {
      dispatch({ type: GAME_STOPPED, payload });
    });
  },
  updatePlayers: () => (dispatch, getState) => {
    const { gameChannel } = getState().game;

    if (gameChannel) {
      gameChannel.push(GAME_GET_PLAYERS)
        .receive('ok', response => dispatch({
          type: GAME_PLAYERS_UPDATED,
          payload: response.players,
        }));
    }
  },
  getData: () => (dispatch, getState) => {
    const { gameChannel } = getState().game;

    if (gameChannel) {
      gameChannel.push(GAME_GET_DATA)
        .receive('ok', response => dispatch(actions.setGame(response.game)));
    }
  },
};

// REDUCER

const initialState = {
  username: '',
  gameId: '',
  playerId: '',
  gameChannel: null,
  game: null,
  messages: [],
  players: {},
};

export function game(state = initialState, action) {
  switch (action.type) {
    case GAME_SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case GAME_SET_GAME_ID:
      return {
        ...state,
        gameId: action.payload,
      };
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
    case GAME_PLAYERS_UPDATED:
      return {
        ...state,
        players: action.payload,
      };
    case GAME_PLAYER_CONNECTED:
      return state;
    case GAME_PLAYER_DISCONNECTED:
      return state;
    default:
      return state;
  }
}

// SELECTORS

export const playersSelector = state => state.game.players;
export const playersArraySelector = createSelector(
  playersSelector,
  players => Object.entries(players).map(([id, player]) => player),
);
