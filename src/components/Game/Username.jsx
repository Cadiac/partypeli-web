import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Avatar, Form } from 'antd';

const FormItem = Form.Item;

class Username extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: !props.username || props.username.length === 0,
    };

    this.startEditing = this.startEditing.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
  }

  startEditing() {
    this.setState({
      editing: true,
    });
  }

  stopEditing() {
    this.setState({
      editing: false,
    });
  }

  render() {
    const { username = '', onUsernameChange } = this.props;

    return (
      <div>
        {this.state.editing ?
          (
            <Form layout="inline">
              <FormItem>
                <Input
                  type="text"
                  value={username}
                  placeholder="Enter your username"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={onUsernameChange}
                />
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={this.props.username.length === 0}
                  onClick={this.stopEditing}
                >
                  Update
                </Button>
              </FormItem>
            </Form>
          ) :
          (
            <div className="username-avatar">
              <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
                {username}
              </Avatar>
              <Button size="small" style={{ marginLeft: 16, verticalAlign: 'middle' }} onClick={this.startEditing}>
                Change
              </Button>
            </div>
          )
        }
      </div>
    );
  }
}

Username.propTypes = {
  username: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
};

export default Username;
