import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon, Form, Avatar, Row, Col } from 'antd';

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
    this.props.saveUsername();
  }

  render() {
    const { username = '', onUsernameChange } = this.props;

    return (
      <div>
        <Row type="flex" justify="flex-start" align="middle" gutter={16}>
          <Col>
            <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
              {username.charAt(0)}
            </Avatar>
          </Col>
          <Col>
            {this.state.editing ?
              <Input
                type="text"
                value={username}
                placeholder="Enter your username"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                onChange={onUsernameChange}
              /> :
              <Col>
                <p>{username}</p>
              </Col>
            }
          </Col>
          <Col>
            {this.state.editing ?
              <Button
                type="primary"
                shape="circle"
                icon="save"
                disabled={this.props.username.length === 0}
                onClick={this.stopEditing}
              /> :
              <Button type="dashed" shape="circle" icon="edit" onClick={this.startEditing} />
            }
          </Col>
        </Row>
      </div>
    );
  }
}

Username.propTypes = {
  username: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  saveUsername: PropTypes.func.isRequired,
};

export default Username;
