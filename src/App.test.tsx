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
