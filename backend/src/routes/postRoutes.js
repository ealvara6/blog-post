const express = require('express');
const { getPosts, getOnePost } = require('../controllers/postController');

const createPostRoutes = (prisma) => {
  const router = express.Router();

  router.use((req, res, next) => {
    req.prisma = prisma;
    next();
  });

  router.get('/', getPosts);
  router.get('/:id', getOnePost);

  return router;
};

module.exports = createPostRoutes;
