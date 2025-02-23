import { Request, Response, NextFunction, Router } from 'express';
import { verifyLogin } from '../controllers/authController';
import { PrismaClient } from '@prisma/client';
import { checkValidationResults } from '../middleware/checkValidation';
import { loginValidationRules } from '../middleware/validateLogin';

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
