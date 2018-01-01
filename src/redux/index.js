import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { user } from './user';
import { socket } from './socket';
import { game } from './game';

// Combine reducers
export const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  socket,
  game,
});

export default rootReducer;
