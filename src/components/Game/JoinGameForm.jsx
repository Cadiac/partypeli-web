import * as React from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';

function JoinGameForm({
  username = '',
  gameId = '',
  onUsernameChange,
  onGameIdChange,
  onClickConnect,
  onClickCreate,
}) {
  return (
    <div className="join-game-form">
      <Input
        type="text"
        value={username}
        addonBefore="Username"
        onChange={onUsernameChange}
      />
      <Input
        type="text"
        value={gameId}
        addonBefore="Game ID"
        onChange={onGameIdChange}
      />
      <Button onClick={() => onClickConnect(gameId)}>Connect</Button>
      <Button onClick={() => onClickCreate()}>New Game</Button>
    </div>
  );
}

JoinGameForm.propTypes = {
  username: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onGameIdChange: PropTypes.func.isRequired,
  onClickConnect: PropTypes.func.isRequired,
  onClickCreate: PropTypes.func.isRequired,
};

export default JoinGameForm;
