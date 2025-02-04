const express = require('express');
const userRoutes = require('./userRoutes');

const createRoutes = (prisma) => {
  const router = express.Router();
  router.use('/users', userRoutes(prisma));

  return router;
};

module.exports = createRoutes;
