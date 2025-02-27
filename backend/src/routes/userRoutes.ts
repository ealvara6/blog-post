import { Router } from 'express';
import {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { validateId } from '../middleware/validators';
import { validateUpdateFields } from '../middleware/validators';
import { PrismaClient } from '@prisma/client';
import { checkValidationResults } from '../middleware/validators/checkValidation.validator';

export const createUserRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router.route('/').get(getUsers);
  router
    .route('/:id')
    .get(validateId, getOneUser)
    .put(
      [validateId, ...validateUpdateFields, checkValidationResults],
      updateUser
    )
    .delete(validateId, deleteUser);

  return router;
};

export default createUserRoutes;
