import * as React from 'react';
import { Button, Input, Icon, Form } from 'antd';
import PropTypes from 'prop-types';
import Username from './Username';

const FormItem = Form.Item;

function JoinGameForm({
  username = '',
  gameId = '',
  onUsernameChange,
  onGameIdChange,
  onClickConnect,
  onClickCreate,
}) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div>
      <Form>
        <FormItem
          {...formItemLayout}
          label="Username"
        >
          <Input
            type="text"
            value={username}
            placeholder="Enter your username"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={onUsernameChange}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Game code"
        >
          <Input
            type="text"
            value={gameId}
            placeholder="Enter the code visible on main screen"
            prefix={<Icon type="calculator" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={onGameIdChange}
          />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            disabled={username.length === 0}
            onClick={() => onClickConnect(gameId)}
          >
            Connect
          </Button>
        </FormItem>
      </Form>
      <Form>
        <FormItem
          {...tailFormItemLayout}
        >
          <Button onClick={() => onClickCreate()}>Create game</Button>
        </FormItem>
      </Form>
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
