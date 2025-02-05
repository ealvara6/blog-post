const express = require('express');
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const {
  validateUser,
  validateUpdateFields,
} = require('../middleware/validateUser');

const createUserRoutes = (prisma) => {
  const router = express.Router();

  router.use((req, res, next) => {
    req.prisma = prisma;
    next();
  });

  router.route('/').get(getUsers).post(validateUser, createUser);
  router
    .route('/:id')
    .get(getOneUser)
    .put(validateUpdateFields, updateUser)
    .delete(deleteUser);

  return router;
};

module.exports = createUserRoutes;
