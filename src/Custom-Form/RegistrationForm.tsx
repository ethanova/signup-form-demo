import React, { MouseEvent, useState } from 'react';
import { Input, Row, Col, Button, Space, Tooltip } from 'antd';
import { InfoCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { validatePassword, validateConfirmationPassword } from '../validation';

interface FieldData {
  value: string;
  errors: string[];
}

const RegistrationForm = () => {
  const [usernameData, setUsernameData] = useState<FieldData>({ value: '', errors: [] });
  const [passwordData, setPasswordData] = useState<FieldData>({
    value: '',
    errors: [],
  });
  const [confirmationPasswordData, setConfirmationPasswordData] = useState<FieldData>({
    value: '',
    errors: [],
  });

  const processPasswordUpdate = (password: string, ignoreLength: boolean = false) => {
    const errors = [];
    const validatePasswordResult = validatePassword(password);
    if (!validatePasswordResult.valid && (password.length > 7 || ignoreLength)) {
      errors.push(validatePasswordResult.error);
    }
    setPasswordData({
      value: password,
      errors,
    });
  };

  const processConfirmationPasswordUpdate = (confirmationPassword: string) => {
    const errors = [];
    const validateConfirmationPasswordResult = validateConfirmationPassword(
      confirmationPassword,
      passwordData.value
    );
    if (!validateConfirmationPasswordResult.valid) {
      errors.push(validateConfirmationPasswordResult.error);
    }
    setConfirmationPasswordData({
      value: confirmationPassword,
      errors,
    });
  };

  const onSubmit = (e: MouseEvent) => {
    e.preventDefault();
    // Ensure form is validated
    processPasswordUpdate(passwordData.value, true);
    if (usernameData.value === '') {
      setUsernameData({ value: '', errors: ['Username must be entered!'] });
    }
    // Submit if form is valid, or don't if not
    if (
      usernameData.value === '' ||
      passwordData.errors.length > 0 ||
      confirmationPasswordData.errors.length > 0
    ) {
      console.log('failed to submit, form validation errors present');
    } else {
      console.log('submit');
    }
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
              value={usernameData.value}
              onChange={(e) => setUsernameData({ value: e.target.value.trim(), errors: [] })}
            />
            <span style={{ color: 'red' }}>{usernameData?.errors?.map((error) => error)}</span>
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
              value={passwordData.value}
              onChange={(e) => processPasswordUpdate(e.target.value)}
              onBlur={(e) => processPasswordUpdate(e.target.value, true)}
            />
            <span style={{ color: 'red' }}>{passwordData.errors?.map((error) => error)}</span>
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
              value={confirmationPasswordData.value}
              onChange={(e) => processConfirmationPasswordUpdate(e.target.value)}
              onBlur={(e) => processConfirmationPasswordUpdate(e.target.value)}
              suffix={confirmationPasswordData.errors.length > 0 && <CloseCircleOutlined />}
            />
            <span style={{ color: 'red' }}>
              {confirmationPasswordData.errors?.map((error) => error)}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Space>
    </form>
  );
};

export default RegistrationForm;
