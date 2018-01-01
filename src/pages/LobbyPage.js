import * as React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { NavLink } from 'react-router-dom';

const LobbyPage = (params) => (
  <div>
    <Header />
    <h2>Lobby {params.id}</h2>
    <NavLink to="/">Etusivu</NavLink>
    <Footer />
  </div>
);

export default LobbyPage;
