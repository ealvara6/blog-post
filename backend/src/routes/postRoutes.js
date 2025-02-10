const express = require('express');
const { getPosts } = require('../controllers/postController');

const createPostRoutes = (prisma) => {
  const router = express.Router();

  router.use((req, res, next) => {
    req.prisma = prisma;
    next();
  });

  router.get('/', getPosts);

  return router;
};

module.exports = createPostRoutes;
