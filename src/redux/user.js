import { getType, createAction } from 'typesafe-actions';

// CONSTANTS

export const USER_SET_USERNAME = 'USER_SET_USERNAME';
export const USER_SET_LOBBY_ID = 'USER_SET_LOBBY_ID';

// ACTIONS

export const actions = {
  setUsername: createAction(USER_SET_USERNAME, (username) => ({
    type: USER_SET_USERNAME,
    payload: username,
  })),

  setLobbyId: createAction(USER_SET_LOBBY_ID, (id) => ({
    type: USER_SET_LOBBY_ID,
    payload: id
  }))
};

// REDUCER

const initialState = {
  username: undefined,
  lobbyId: undefined,
};

export function user(state = initialState, action) {
  switch (action.type) {
    case getType(actions.setUsername):
      return {
        ...state,
        username: action.payload,
      };
    case getType(actions.setLobbyId):
      return {
        ...state,
        lobbyId: action.payload,
      };
    default:
      return state;
  }
}
