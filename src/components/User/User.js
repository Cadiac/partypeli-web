import * as React from 'react';
import { Button, Input } from 'antd';

function User({username = '', lobbyId = '', onUsernameChange, onLobbyIdChange, onClickConnect}) {
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
      <Button onClick={onClickConnect}>Connect</Button>
    </div>
  );
}

export default User;
