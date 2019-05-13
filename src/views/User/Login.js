import React, { Component } from 'react';
import styles from "./Login.less";
import {
  Form, Icon, Input, Button, message
} from 'antd';
import requestLogin from "../../request/login";
import { connect } from 'react-redux'
import { updateUsername } from "../../store/actions/user";

const FormItem = Form.Item;

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    updateUsername: (account) => {
      dispatch(updateUsername(account));
    }
  }
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const { history, updateUsername } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        requestLogin(values).then(res => {
          localStorage.setItem('token', `Bearer ${res.data.accessToken}`);
          localStorage.setItem('username', res.data.name);
          localStorage.setItem('expires', res.data.expiresIn * 1000 + Date.now());
          updateUsername(res.data.name);
          message.success('欢迎登录');
          history.push('/');
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles["login-page"]}>
        <h2>登录</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your account!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Login;
