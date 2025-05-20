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

export const authUserRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router
    .route('/:id')
    .put(validateUserUpdate, updateUser)
    .delete(validateUserDeletion, deleteUser);

  router.get('/:id/posts', validateId, getUserPosts);
  router.get('/:id/comments', validateId, getUserComments);

  return router;
};

export default authUserRoutes;
