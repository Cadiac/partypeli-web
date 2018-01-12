import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { actions as gameActions } from '../redux/game';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerListContainer from '../containers/PlayerListContainer';

class GamePage extends React.Component {
  componentDidMount() {
    const {
      playerId, socket, gameId, username,
    } = this.props;
    this.props.joinGame(socket, playerId, gameId, username);
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
  username: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
  playerId: PropTypes.string.isRequired,
};

export function mapStateToProps(state, ownProps) {
  return {
    gameId: ownProps.match.params.id,
    playerId: state.game.playerId,
    username: state.game.username,
    socket: state.connection.socket,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    joinGame: (socket, playerId, gameId, username) =>
      dispatch(gameActions.joinGame(socket, playerId, gameId, username)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
