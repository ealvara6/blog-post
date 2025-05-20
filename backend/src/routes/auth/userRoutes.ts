import { Router } from 'express';
import { PrismaClient } from '@prisma/client/extension';
import {
  deleteUser,
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

  return router;
};

export default authUserRoutes;
