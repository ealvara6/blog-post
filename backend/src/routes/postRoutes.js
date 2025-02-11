const express = require('express');
const {
  getPosts,
  getOnePost,
  createPost,
} = require('../controllers/postController');
const { validatePost } = require('../middleware/validatePost');

const createPostRoutes = (prisma) => {
  const router = express.Router();

  router.use((req, res, next) => {
    req.prisma = prisma;
    next();
  });

  router.route('/').get(getPosts).post(validatePost, createPost);

  router.get('/:id', getOnePost);

  return router;
};

module.exports = createPostRoutes;
