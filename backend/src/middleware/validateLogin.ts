import { body, ValidationChain } from 'express-validator';

export const loginValidationRules: ValidationChain[] = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),

  body('password').notEmpty().withMessage('Please enter a password'),
];
