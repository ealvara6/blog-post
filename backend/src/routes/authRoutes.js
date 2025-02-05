const express = require('express');
const { verifyLogin } = require('../controllers/authController');
const validateLoginCredentials = require('../middleware/validateAuth');

const createAuthRoutes = (prisma) => {
  const router = express.Router();

  router.use((req, res, next) => {
    req.prisma = prisma;
    next();
  });

  router.post('/', validateLoginCredentials, verifyLogin);

  return router;
};

module.exports = createAuthRoutes;
