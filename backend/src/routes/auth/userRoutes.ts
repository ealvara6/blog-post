import { Router } from 'express';
import { PrismaClient } from '@prisma/client/extension';
import {
  deleteUser,
  getUserComments,
  getUserPosts,
  updateUser,
} from '../../controllers/userController';
import {
  validateUserDeletion,
  validateUserUpdate,
} from '../../middleware/validators/validationMiddleware';
import { validateId } from '../../middleware/validators';
import { authenticateToken } from '../../middleware/authMiddleware';

export const authUserRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router
    .route('/:id')
    .put(validateUserUpdate, updateUser)
    .delete(validateUserDeletion, deleteUser);

  router.get('/:id/posts', validateId, getUserPosts);
  router.get('/comments/me', authenticateToken, getUserComments);

  return router;
};

export default authUserRoutes;
