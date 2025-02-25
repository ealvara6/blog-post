import { body, ValidationChain } from 'express-validator';

export const validateComment: ValidationChain[] = [
  body('content')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Comment must have content')
    .isLength({ max: 300 })
    .withMessage('Comment cannot exceed 300 characters'),
];
