import { connect } from 'react-redux';
import { playersArraySelector } from '../redux/game';

import PlayerList from '../components/Game/PlayerList';

export function mapStateToProps(state) {
  return {
    players: playersArraySelector(state),
  };
}

export default connect(mapStateToProps)(PlayerList);
