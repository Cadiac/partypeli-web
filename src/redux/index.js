import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { connection } from './connection';
import { game } from './game';

// Combine reducers
export const rootReducer = combineReducers({
  routing: routerReducer,
  connection,
  game,
});

export default rootReducer;
