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

  router.get('/', getUsers(prisma));
  router.get('/:id', getOneUser(prisma));

  router.put('/:id', validateUpdateFields, updateUser(prisma));

  router.post('/register', validateUser, createUser(prisma));

  router.delete('/:id', deleteUser(prisma));

  return router;
};

module.exports = createUserRoutes;
