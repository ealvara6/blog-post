import { body, ValidationChain } from 'express-validator';

const PostValidationRules: ValidationChain[] = [
  body('title')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Post must have a title'),

  body('content').trim().escape(),
];

export default PostValidationRules;
