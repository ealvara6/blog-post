import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticateToken';
import { PrismaClient } from '@prisma/client/extension';
import {
  checkValidationResults,
  validateId,
  validateUpdateFields,
} from '../../middleware/validators';
import { deleteUser, updateUser } from '../../controllers/userController';

export const authUserRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router
    .route('/:id')
    .put(
      authenticateToken,
      validateId,
      [...validateUpdateFields, checkValidationResults],
      updateUser
    )
    .delete(authenticateToken, validateId, deleteUser);

  return router;
};

export default authUserRoutes;
