const { body, validationResult } = require('express-validator');

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

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
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
  handleErrors,
];

const validateUpdateFields = [
  validateUsername(),
  validateEmail(),
  validatePassword(),
  handleErrors,
];

module.exports = { validateUser, validateUpdateFields };
