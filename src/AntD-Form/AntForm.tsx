import React from 'react';
import { Form, Input, Button, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { passwordRegexRule } from '../validation';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const AntForm = () => {
  const onSubmit = (values: any) => {
    console.log(values);
    const loginInfo = {
      username: values.username.trim(),
      password: values.password.trim(),
    };
    console.log(loginInfo);
  };
  return (
    <Form {...layout} name="login" onFinish={onSubmit}>
      <p>
        I originally built the form in Ant.d, but didn't love how complicated it was so I built the
        more custom one as well without throwing this away.
      </p>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Password&nbsp;
            <Tooltip title="Should be at least 8 characters, with a combination of letters, numbers, and special characters">
              <InfoCircleOutlined />
            </Tooltip>
          </span>
        }
        name="password"
        validateTrigger="onBlur"
        rules={[{ required: true, message: 'Please enter your password!' }, passwordRegexRule]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmation_password"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="submit" wrapperCol={{ offset: 8, span: 8 }}>
        <Button data-testid="submit-registration" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AntForm;
