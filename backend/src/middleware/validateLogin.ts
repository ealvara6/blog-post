import { body, ValidationChain } from 'express-validator';

const loginValidationRules: ValidationChain[] = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),

  body('password').notEmpty().withMessage('Please enter a password'),
];

export default loginValidationRules;
