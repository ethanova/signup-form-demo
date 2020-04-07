//TODO: unit tests

export const passwordRegexRule = {
  pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
  message:
    'Must contain at least 1 lowercase, 1 upper case, and 1 special character, and be longer than 8 characters.',
};

export const validatePassword = (password: string) => {
  if (passwordRegexRule.pattern.test(password)) {
    return {
      valid: true,
      error: '',
    };
  } else {
    return {
      valid: false,
      error: passwordRegexRule.message,
    };
  }
};

export const validateConfirmationPassword = (
  confirmationPassword: string,
  originalPassword: string
) => {
  if (confirmationPassword === originalPassword) {
    return {
      valid: true,
      error: '',
    };
  } else {
    return {
      valid: false,
      error: 'The two passwords that you entered do not match!',
    };
  }
};
