import React from 'react';
import { Form, Input, Button } from 'antd';
import logo from './logo.svg';
import './App.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const App = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>The best login form you'll ever use.</p>
      </header>
      <div>
        <Form {...layout} name="login" onFinish={onSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmation_password"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
