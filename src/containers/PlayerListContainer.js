import { connect } from 'react-redux';
import PlayerList from '../components/Game/PlayerList';

export function mapStateToProps(state) {
  return {
    players: state.game.players,
  };
}

export default connect(mapStateToProps)(PlayerList);
