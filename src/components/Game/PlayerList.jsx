import * as React from 'react';
import { List, Avatar } from 'antd';
import PropTypes from 'prop-types';

function PlayerList({ players }) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={players}
      renderItem={player => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<a href="https://ant.design">{player.username}</a>}
          />
        </List.Item>
      )}
    />
  );
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
  })),
};

export default PlayerList;
