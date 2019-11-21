import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Avatar, message } from "antd";
import { inject, observer } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import "./Register.scss";

@withRouter
@Form.create()
@inject("user")
@observer
class Register extends Component {
  state = {
    confirmDirty: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.user.register(values, this.props.history);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div className="register">
          <div className="register-card">
            <div className="register-title">Register</div>
            <Form onSubmit={this.handleSubmit} className="register-form">
              <Form.Item hasFeedback>
                {getFieldDecorator("first_name", {
                  rules: [
                    { required: true, message: "Please input your first name!" }
                  ]
                })(<Input placeholder="first name" />)}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator("last_name", {
                  rules: [
                    { required: true, message: "Please input your last_name!" }
                  ]
                })(<Input placeholder="last name" />)}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    }
                  ]
                })(<Input placeholder="email" />)}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password placeholder="password" />)}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your password!"
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input.Password
                    onBlur={this.handleConfirmBlur}
                    placeholder="confirm password"
                  />
                )}
              </Form.Item>

              <div className="reg-submit">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-button"
                >
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
