import { connect } from 'react-redux';

import Username from '../components/Game/Username';
import { actions as gameActions } from '../redux/game';

export function mapStateToProps(state) {
  return {
    username: state.game.username,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onUsernameChange: event =>
      dispatch(gameActions.setUsername(event.currentTarget.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Username);
