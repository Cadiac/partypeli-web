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
      socket, gameId, username, connecting,
    } = this.props;

    if (!connecting && socket && gameId) {
      this.props.joinGame(socket, gameId, username);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Wait until socket has connected before joining game.
    if (!this.props.socket && nextProps.socket) {
      const { socket, gameId, username } = nextProps;
      this.props.joinGame(socket, gameId, username);
    }
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
  socket: PropTypes.object,
  // playerId: PropTypes.string.isRequired,
  connecting: PropTypes.bool.isRequired,
};

export function mapStateToProps(state, ownProps) {
  return {
    gameId: ownProps.match.params.id,
    // playerId: state.game.playerId,
    username: state.game.username,
    socket: state.connection.socket,
    connecting: state.connection.connecting,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    joinGame: (socket, gameId, username) =>
      dispatch(gameActions.joinGame(socket, gameId, username)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
