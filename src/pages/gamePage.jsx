import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  actions as gameActions,
} from '../redux/game';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerListContainer from '../containers/PlayerListContainer';
import UsernameContainer from '../containers/UsernameContainer';

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
        <UsernameContainer />
        <Button onClick={this.props.updatePlayers}>
          Fetch players
        </Button>
        <PlayerListContainer />
        <NavLink to="/">Etusivu</NavLink>
        <Footer />
      </div>
    );
  }
}

GamePage.propTypes = {
  // Actions
  joinGame: PropTypes.func.isRequired,
  updatePlayers: PropTypes.func.isRequired,
  // Props
  gameId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  socket: PropTypes.object,
  connecting: PropTypes.bool.isRequired,
};

export function mapStateToProps(state, ownProps) {
  return {
    gameId: ownProps.match.params.id,
    username: state.game.username,
    socket: state.connection.socket,
    connecting: state.connection.connecting,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    joinGame: (socket, gameId, username) =>
      dispatch(gameActions.joinGame(socket, gameId, username)),
    updatePlayers: () =>
      dispatch(gameActions.updatePlayers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
