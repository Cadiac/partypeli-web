import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import store from './store';
import history from './history';

import IndexPage from './pages/IndexPage';
import LobbyPage from './pages/LobbyPage';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'antd/dist/antd.css';

import './game/game';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact={true} path="/" component={IndexPage}/>
        <Route path="/lobby/:id" component={LobbyPage}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
