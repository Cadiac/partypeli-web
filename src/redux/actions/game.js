import { push } from 'react-router-redux';
import * as game from '../game';

export function setGame(gameState) {
  return {
    type: game.GAME_SET_GAME,
    payload: gameState,
  };
}

export function setChannelAndGame(channel, gameState) {
  return (dispatch) => {
    dispatch({
      type: game.GAME_SET_CHANNEL,
      payload: channel,
    });

    dispatch(setGame(gameState));
  };
}

export function joinGame(socket, playerId, gameId) {
  return (dispatch) => {
    const channel = socket.channel(`game:${gameId}`);

    // Dispatch all received messages and handler them at reducer level
    channel.onMessage = ((event, payload) => {
      dispatch({
        type: event,
        payload,
      });

      return payload;
    });

    channel.join()
      .receive('ok', () => {
        channel.push(game.GAME_GET_DATA, { game_id: gameId, player_id: playerId })
          .receive('ok', (payload) => {
            dispatch(setChannelAndGame(channel, payload.game));
          });

        channel.push(game.JOINED_GAME);
      })
      .receive('error', (payload) => {
        if (payload.reason === 'No more players allowed') dispatch(push('/not_found'));
        if (payload.reason === 'Game does not exist') dispatch(push('/not_found'));
      });
  };
}
