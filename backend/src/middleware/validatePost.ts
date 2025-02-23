import { body, ValidationChain } from 'express-validator';

export const validatePost: ValidationChain[] = [
  body('title')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Post must have a title')
    .isLength({ max: 50 })
    .withMessage('Title must be less than 50 characters long'),
  body('content').trim().escape(),
];
