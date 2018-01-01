import * as React from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types'; // ES6

function User({
  username = '', lobbyId = '', onUsernameChange, onLobbyIdChange, onClickConnect,
}) {
  return (
    <div className="hello">
      <div className="greeting">
        {username}
      </div>
      <Input
        type="text"
        value={username}
        addonBefore="Username"
        onChange={onUsernameChange}
      />
      <Input
        type="text"
        value={lobbyId}
        addonBefore="Lobby ID"
        onChange={onLobbyIdChange}
      />
      <Button onClick={() => onClickConnect(lobbyId)}>Connect</Button>
    </div>
  );
}

User.propTypes = {
  username: PropTypes.string.isRequired,
  lobbyId: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onLobbyIdChange: PropTypes.func.isRequired,
  onClickConnect: PropTypes.func.isRequired,
};

export default User;
