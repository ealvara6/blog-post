import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { getPost, getPosts } from '../controllers/postController';
import {
  checkValidationResults,
  validateCommentId,
  validateId,
  validateUser,
} from '../middleware/validators';
import { getComment, getComments } from '../controllers/commentController';
import {
  getUser,
  getUserOnUsername,
  getUsers,
} from '../controllers/userController';
import { createUser } from '../controllers/authController';
import { getCategories } from '../controllers/categoryController';
import {
  getLikesOnComment,
  getLikesOnPost,
} from '../controllers/likeController';

export const publicRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router.get('/test-secret', (req, res) => {
    res.send(`JWT_SECRET is: ${process.env.JWT_SECRET}` || 'not set');
  });

  router.route('/posts').get(getPosts);
  router.get('/posts/:id', validateId, getPost);
  router.get('/posts/:id/comments', validateId, getComments);
  router.get('/posts/:id/comments/:commentId', validateCommentId, getComment);
  router.get('/posts/:id/likes', getLikesOnPost);
  router.get('/comments/:commentId/likes', getLikesOnComment);
  router.post(
    '/register',
    [...validateUser, checkValidationResults],
    createUser
  );

  router.get('/users', getUsers);
  router.get('/users/:username', getUserOnUsername);

  router.get('/categories', getCategories);

  return router;
};

export default publicRoutes;
