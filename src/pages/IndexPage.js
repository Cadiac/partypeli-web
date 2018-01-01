import * as React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import UserContainer from '../containers/UserContainer';

import { NavLink } from 'react-router-dom';

const IndexPage = () => (
  <div className="index">
    <Header />
    <NavLink to="/lobby/123e4567-e89b-12d3-a456-426655440000">Lobby</NavLink>
    <UserContainer />
    <Footer />
  </div>
);

export default IndexPage;
