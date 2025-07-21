import { body, ValidationChain } from 'express-validator';

export const validatePostLike: ValidationChain[] = [
  body('postId')
    .notEmpty()
    .withMessage('PostId is required')
    .isNumeric()
    .withMessage('Invalid PostId'),
];
