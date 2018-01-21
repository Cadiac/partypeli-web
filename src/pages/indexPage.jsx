import * as React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import JoinGameContainer from '../containers/JoinGameContainer';

const IndexPage = () => (
  <div className="index">
    <Header />
    <h1>Partypeli</h1>
    <JoinGameContainer />
    <Footer />
  </div>
);

export default IndexPage;
