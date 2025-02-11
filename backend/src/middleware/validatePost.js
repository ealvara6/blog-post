const { body, validationResult } = require('express-validator');

const validatePost = [
  body('title')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Post must have a title'),

  body('content').trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validatePost };
