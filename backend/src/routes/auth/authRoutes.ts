import { Router } from 'express';
import { createUser, verifyLogin } from '../../controllers/authController';
import { PrismaClient } from '@prisma/client';
import { checkValidationResults } from '../../middleware/validators/checkValidation.validator';
import { loginValidationRules } from '../../middleware/validators/validateLogin.validator';
import { validateUser } from '../../middleware/validators';

export const createAuthRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router.post(
    '/register',
    [...validateUser, checkValidationResults],
    createUser
  );
  router.post(
    '/login',
    [...loginValidationRules, checkValidationResults],
    verifyLogin
  );

  return router;
};

export default createAuthRoutes;
