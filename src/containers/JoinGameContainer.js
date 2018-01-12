import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import JoinGameForm from '../components/Game/JoinGameForm';
import { actions as gameActions } from '../redux/game';

import { actions as connectionActions } from '../redux/connection';

export function mapStateToProps(state) {
  return {
    username: state.game.username,
    gameId: state.game.gameId,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onUsernameChange: event =>
      dispatch(gameActions.setUsername(event.currentTarget.value)),
    onGameIdChange: event =>
      dispatch(gameActions.setGameId(event.currentTarget.value)),
    onClickConnect: gameId => dispatch(push(`/game/${gameId}`)),
    onClickCreate: () => dispatch(connectionActions.createGame()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGameForm);
