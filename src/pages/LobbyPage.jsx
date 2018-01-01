import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerListContainer from '../containers/PlayerListContainer';

// import './game/game';

const LobbyPage = params => (
  <div>
    <Header />
    <h2>Lobby {params.id}</h2>
    <PlayerListContainer />
    <NavLink to="/">Etusivu</NavLink>
    <Footer />
  </div>
);

export default LobbyPage;
