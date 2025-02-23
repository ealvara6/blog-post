import { Router, Request, Response, NextFunction } from 'express';
import {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { validateId } from '../middleware/validators';
import { validateUser, validateUpdateFields } from '../middleware/validateUser';
import { PrismaClient } from '@prisma/client';
import checkValidationResults from '../middleware/checkValidation';

const createUserRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router
    .route('/')
    .get(getUsers)
    .post([...validateUser, checkValidationResults], createUser);
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
