import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { inject, observer } from "mobx-react";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
@Form.create()
@inject("posts")
@observer
class AddPost extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.posts.addPost(values).then(() => {
          this.props.form.resetFields();
          this.props.form.validateFields();
        });
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const nameError = isFieldTouched("name") && getFieldError("name");
    return (
      <Form className="post-add" layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={nameError ? "error" : ""}
          help={nameError || ""}
        >
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input post name!" }]
          })(<Input placeholder="post name" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddPost;
