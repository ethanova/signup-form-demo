import React, { MouseEvent, useState, useEffect } from 'react';
import { Input, Row, Col, Button, Space, Tooltip } from 'antd';
import { InfoCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { validatePassword, validateConfirmationPassword } from '../validation';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [usernameErrors, setUsernameErrors] = useState<string[]>([]);
  const [usernameIsAvailable, setUsernameIsAvailable] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [confirmationPasswordErrors, setConfirmationPasswordErrors] = useState<string[]>([]);
  const [registrationCallInProgress, setRegistrationCallInProgress] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  useEffect(() => {
    const errors = [];
    const validatePasswordResult = validatePassword(password);
    if (!validatePasswordResult.valid && password.length > 0) {
      errors.push(validatePasswordResult.error);
    }
    setPasswordErrors(errors);
  }, [password]);

  useEffect(() => {
    if (confirmationPassword.length > 0) {
      const errors = [];
      const validateConfirmationPasswordResult = validateConfirmationPassword(
        confirmationPassword,
        password
      );
      if (!validateConfirmationPasswordResult.valid) {
        errors.push(validateConfirmationPasswordResult.error);
      }
      setConfirmationPasswordErrors(errors);
    }
  }, [confirmationPassword, password]);

  const onSubmit = (e: MouseEvent) => {
    e.preventDefault();
    // Ensure form is validated
    if (username === '') setUsernameErrors(['A username must be entered.']);
    if (password === '') setPasswordErrors(['You must enter a password.']);
    if (confirmationPassword === '') {
      setConfirmationPasswordErrors(['You must re-enter your password.']);
    }
    if (username === '' || password === '' || confirmationPassword === '') {
      console.log('Form not valid, cannot submit');
      return;
    }
    setRegistrationCallInProgress(true);
    const url = 'https://na44zeyw3a.execute-api.us-east-1.amazonaws.com/default/tst-demo-ingest';
    const encodedUrl = `${url}?username=${username}`;
    fetch(encodedUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((response) => {
        setRegistrationCallInProgress(false);
        if (response.success === true) {
          setServerResponse('Registration successful!');
        } else {
          setServerResponse('Something went wrong, please try again later.');
        }
      });
  };

  const checkIfUsernameAlreadyExists = (username: string) => {
    const url = `https://na44zeyw3a.execute-api.us-east-1.amazonaws.com/default/tst-demo-check-username?username=${username}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.usernameExists === true) {
          setUsernameIsAvailable(false);
          setUsernameErrors(['Username already exists, please pick a different username.']);
        } else {
          setUsernameErrors([]);
          setUsernameIsAvailable(true);
        }
      });
  };

  return (
    <form>
      <Space style={{ width: '100%' }} direction="vertical" size="middle">
        <Row>
          <Col span={3} offset={6}>
            <label htmlFor="username">Username: </label>
          </Col>
          <Col span={7}>
            <Input
              id="username"
              data-testid="username"
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              onBlur={(e) => checkIfUsernameAlreadyExists(e.target.value.trim())}
            />
            <span style={{ color: 'red' }}>{usernameErrors?.map((error) => error)}</span>
            {usernameIsAvailable && (
              <span style={{ color: 'green' }}>
                <CheckOutlined />
                &nbsp; Username is available!
              </span>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={3} offset={6}>
            <label htmlFor="password">
              Password:&nbsp;
              <Tooltip title="Should be at least 8 characters, with a combination of letters, numbers, and special characters">
                <InfoCircleOutlined />
              </Tooltip>
            </label>
          </Col>
          <Col span={7}>
            <Input.Password
              id="password"
              data-testid="password"
              placeholder="hunter2"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span style={{ color: 'red' }}>{passwordErrors?.map((error) => error)}</span>
          </Col>
        </Row>
        <Row>
          <Col span={3} offset={6}>
            <label htmlFor="confirm_password">Confirm Password: </label>
          </Col>
          <Col span={7}>
            <Input.Password
              id="confirm_password"
              data-testid="confirmation_password"
              placeholder="hunter2"
              autoComplete="new-password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
            />
            <span style={{ color: 'red' }}>
              {confirmationPasswordErrors?.map((error) => error)}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onSubmit}
              disabled={registrationCallInProgress}
            >
              Submit
            </Button>
            <p>{serverResponse}</p>
          </Col>
        </Row>
      </Space>
    </form>
  );
};

export default RegistrationForm;
