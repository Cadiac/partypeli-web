import * as React from 'react';
import { NavLink } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import JoinGameContainer from '../containers/JoinGameContainer';

const IndexPage = () => (
  <div className="index">
    <Header />
    <NavLink to="/game/1234">Game</NavLink>
    <JoinGameContainer />
    <Footer />
  </div>
);

export default IndexPage;
