import { Router } from 'express';
import { verifyLogin } from '../controllers/authController';
import { PrismaClient } from '@prisma/client';
import { checkValidationResults } from '../middleware/validators/checkValidation.validator';
import { loginValidationRules } from '../middleware/validators/validateLogin.validator';

export const createAuthRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router.post(
    '/',
    [...loginValidationRules, checkValidationResults],
    verifyLogin
  );

  return router;
};

export default createAuthRoutes;
