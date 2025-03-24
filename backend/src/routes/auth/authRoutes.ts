import { Router } from 'express';
import { createUser, verifyLogin } from '../../controllers/authController';
import { PrismaClient } from '@prisma/client';
import { checkValidationResults } from '../../middleware/validators/checkValidation.validator';
import { loginValidationRules } from '../../middleware/validators/validateLogin.validator';
import { validateUser } from '../../middleware/validators';
import { validateUserProfile } from '../../middleware/validators/validationMiddleware';
import { getAuthUser } from '../../controllers/userController';

export const createAuthRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router.get(
    '/me',
    [...validateUserProfile, checkValidationResults],
    getAuthUser
  );
  router.post(
    '/login',
    [...loginValidationRules, checkValidationResults],
    verifyLogin
  );

  return router;
};

export default createAuthRoutes;
