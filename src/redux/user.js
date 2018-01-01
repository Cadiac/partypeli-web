// CONSTANTS

export const USER_SET_USERNAME = 'USER_SET_USERNAME';

// ACTIONS

export const actions = {
  setUsername: username => ({ type: USER_SET_USERNAME, payload: username }),
};

// REDUCER

const initialState = {
  username: '',
};

export function user(state = initialState, action) {
  switch (action.type) {
    case USER_SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
}
