import { body, ValidationChain } from 'express-validator';

const validateUsername = () => {
  return body('username')
    .trim()
    .notEmpty()
    .withMessage('username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long ');
};

const validateEmail = () => {
  return body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail();
};

const validatePassword = () => {
  return body('password')
    .isLength({ min: 7 })
    .withMessage('password must be at least 7 characters long');
};

const validateUser = [
  validateUsername(),
  validateEmail(),
  validatePassword(),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

const validateUpdateFields: ValidationChain[] = [
  validateUsername(),
  validateEmail(),
  validatePassword(),
];

export { validateUser, validateUpdateFields };
