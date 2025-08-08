import { Router } from 'express';
import { PrismaClient } from '@prisma/client/extension';
import {
  deleteUser,
  getLikedPosts,
  getUserComments,
  getUserPosts,
  updateUser,
} from '../../controllers/userController';
import {
  validateUserDeletion,
  validateUserUpdate,
} from '../../middleware/validators/validationMiddleware';
import { authenticateToken } from '../../middleware/authMiddleware';

export const authUserRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router
    .route('/me')
    .put(validateUserUpdate, updateUser)
    .delete(validateUserDeletion, deleteUser);

  router.get('/posts/me', authenticateToken, getUserPosts);
  router.get('/comments/me', authenticateToken, getUserComments);
  router.get('/likes/posts/me', authenticateToken, getLikedPosts);

  return router;
};

export default authUserRoutes;
