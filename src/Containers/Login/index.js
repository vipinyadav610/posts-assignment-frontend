import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Avatar, message } from "antd";
import "./Login.scss";
import { inject, observer } from "mobx-react";
import { withRouter, Link } from "react-router-dom";

@withRouter
@Form.create()
@inject("user")
@observer
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.user.login(values, this.props.history);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div className="login">
          <div className="login-card">
            <Avatar size={64} icon="user" />
            <div className="login-title">Sign in</div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item hasFeedback>
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="email"
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>

              <div className="reg-submit">
                Not registered yet?<Link to="/register">Register now!</Link>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.user.loading}
                  className="login-form-button"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
