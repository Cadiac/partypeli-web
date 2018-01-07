import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { user } from './user';
import { connection } from './connection';
import { game } from './game';

// Combine reducers
export const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  connection,
  game,
});

export default rootReducer;
