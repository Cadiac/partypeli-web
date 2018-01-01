import { connect } from 'react-redux';
import User from '../components/User/User';
import { actions as userActions } from '../redux/user';
import { actions as socketActions } from '../redux/socket';

export function mapStateToProps(state) {
  return {
    username: state.user.username,
    lobbyId: state.socket.lobbyId,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onUsernameChange: event =>
      dispatch(userActions.setUsername(event.currentTarget.value)),
    onLobbyIdChange: event =>
      dispatch(socketActions.setLobbyId(event.currentTarget.value)),
    onClickConnect: () =>
      dispatch(socketActions.openConnection()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
