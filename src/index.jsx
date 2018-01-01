import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import 'antd/dist/antd.css';

import store from './store';
import history from './history';

import IndexPage from './pages/IndexPage';
import LobbyPage from './pages/LobbyPage';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

import './game/game';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={IndexPage} />
        <Route path="/lobby/:id" component={LobbyPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
