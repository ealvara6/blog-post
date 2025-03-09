import { Router } from 'express';
import { PrismaClient } from '@prisma/client/extension';
import { deleteUser, updateUser } from '../../controllers/userController';
import {
  validateUserDeletion,
  validateUserUpdate,
} from '../../middleware/validators/validationMiddleware';

export const authUserRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router
    .route('/:id')
    .put(validateUserUpdate, updateUser)
    .delete(validateUserDeletion, deleteUser);

  return router;
};

export default authUserRoutes;
