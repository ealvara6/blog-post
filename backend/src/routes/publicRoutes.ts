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
import { getUser, getUsers } from '../controllers/userController';
import { createUser } from '../controllers/authController';

export const publicRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router.route('/posts').get(getPosts);
  router.get('/posts/:id', validateId, getPost);
  router.get('/posts/:id/comments', validateId, getComments);
  router.get('/posts/:id/comments/:commentId', validateCommentId, getComment);
  router.post(
    '/register',
    [...validateUser, checkValidationResults],
    createUser
  );

  router.get('/users', getUsers);
  router.get('/users/:id', validateId, getUser);

  return router;
};

export default publicRoutes;
