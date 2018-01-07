import { connect } from 'react-redux';
import User from '../components/User/User';
import { actions as userActions } from '../redux/user';
import { actions as connectionActions } from '../redux/connection';

export function mapStateToProps(state) {
  return {
    username: state.user.username,
    lobbyId: '',
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onUsernameChange: event =>
      dispatch(userActions.setUsername(event.currentTarget.value)),
    onLobbyIdChange: event => event,
    onClickConnect: () => dispatch(connectionActions.createGame()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
