import { body, ValidationChain } from 'express-validator';

const validateUsername = () => {
  return body('username')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long ');
};

const validateEmail = () => {
  return body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail();
};

const validatePassword = () => {
  return body('password')
    .optional()
    .isLength({ min: 7 })
    .withMessage('password must be at least 7 characters long');
};

export const validateUser = [
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

export const validateUpdateFields: ValidationChain[] = [
  validateUsername(),
  validateEmail(),
  validatePassword(),
];
