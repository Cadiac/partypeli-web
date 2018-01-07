import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as gameActions from '../redux/actions/game';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerListContainer from '../containers/PlayerListContainer';

class GamePage extends React.Component {
  componentDidMount() {
    const { playerId, socket, gameId } = this.props;
    this.props.joinGame(socket, playerId, gameId);
  }

  render() {
    return (
      <div>
        <Header />
        <h2>Game {this.props.gameId}</h2>
        <PlayerListContainer />
        <NavLink to="/">Etusivu</NavLink>
        <Footer />
      </div>
    );
  }
}

GamePage.propTypes = {
  gameId: PropTypes.string.isRequired,
  joinGame: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  playerId: PropTypes.string.isRequired,
};

export function mapStateToProps(state, ownProps) {
  return {
    gameId: ownProps.match.params.id,
    playerId: 'asfdfg',
    socket: state.connection.socket,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    joinGame: (socket, playerId, gameId) =>
      dispatch(gameActions.joinGame(socket, playerId, gameId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
