import React from 'react';
import './matchMedia.mock';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('Password field requirements', () => {
  const passwordErrorMessage =
    'Must contain at least 1 lowercase, 1 upper case, and 1 special character, and be longer than 8 characters';
  it('should show error if password does not contain at least 8 characters', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'aB8*' },
    });
    fireEvent.blur(screen.getByLabelText('Password'));
    const alert = await screen.findByText(new RegExp(passwordErrorMessage));
    expect(alert).toHaveTextContent(passwordErrorMessage);
  });
  it('should show error if password does not contain a lowercase letter', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'AAAAAAAAAA8*' },
    });
    fireEvent.blur(screen.getByLabelText('Password'));
    const alert = await screen.findByText(new RegExp(passwordErrorMessage));
    expect(alert).toHaveTextContent(passwordErrorMessage);
  });
  it('should show error if password does not contain an uppercase letter', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'aaaaaaaaaa8*' },
    });
    fireEvent.blur(screen.getByLabelText('Password'));
    const alert = await screen.findByText(new RegExp(passwordErrorMessage));
    expect(alert).toHaveTextContent(passwordErrorMessage);
  });
  it('should show error if password does not contain a special character', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Aaaaaaaaaa8' },
    });
    fireEvent.blur(screen.getByLabelText('Password'));
    const alert = await screen.findByText(new RegExp(passwordErrorMessage));
    expect(alert).toHaveTextContent(passwordErrorMessage);
  });
  it('should not show error if password has 1 upper/lower char and 1 special char', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Aaaaaaaaaa8*' },
    });
    fireEvent.blur(screen.getByLabelText('Password'));
    // const alert = await screen.findByText(new RegExp(passwordErrorMessage));
    expect(screen.queryByText(new RegExp(passwordErrorMessage))).toBeNull();
  });
});

describe('Confirmation password field', () => {
  it('should show error about needing to match when this password does not match initial', async () => {
    const errorMessage = 'The two passwords that you entered do not match!';
    render(<App />);
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'abcdef' },
    });
    fireEvent.blur(screen.getByLabelText('Confirm Password'));
    const alert = await screen.findByText(errorMessage);
    expect(alert.textContent).toBe(errorMessage);
  });
  it('should NOT show error about needing to match when this password does match initial', async () => {
    const errorMessage = 'The two passwords that you entered do not match!';
    const component = render(<App />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'P@ssw0rd' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'P@ssw0rd' },
    });
    try {
      // ant and RTL really don't seem to mix well together
      await screen.findByText(errorMessage);
    } catch (e) {}
    expect(await screen.queryByText(errorMessage)).toBeNull();
  });
});
