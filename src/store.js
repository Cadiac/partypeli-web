import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import socketMiddleware from './redux/middleware/socket';

import { rootReducer } from './redux/index';

import { actions as connectionActions } from './redux/connection';

import history from './history';
// import { loadState, saveState } from './services/localStorage';

function configureStore() {
  // configure middlewares
  const middlewares = [
    routerMiddleware(history),
    thunk,
    socketMiddleware,
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  // const persistedState = loadState();

  // create store
  return createStore(
    rootReducer,
    // persistedState,
    applyMiddleware(...middlewares),
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();
// store.subscribe(() => {
//   saveState(store.getState());
// });

function openSocket() {
  const { dispatch } = store;
  dispatch(connectionActions.openConnection());
}

openSocket();

// export store singleton instance
export default store;
