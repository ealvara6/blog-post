import { NextFunction, Request, Response, Router } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import postRoutes from './postRoutes';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import { prismaMiddleWare } from '../middleware/prismaMiddleware';

export const createRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router.use(prismaMiddleWare(prisma));

  router.use('/users', userRoutes(prisma));
  router.use('/login', authRoutes(prisma));
  router.use('/posts', postRoutes(prisma));

  router.get('/health', (req: Request, res: Response): void => {
    res.status(200).json({ status: 'This is a public health check' });
  });

  router.get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response): void => {
      res.json({
        message: 'You have accessed a protected route!',
        user: req.user,
      });
    }
  );

  router.all('*', (req: Request, res: Response): void => {
    res.status(404).json({ error: 'Not found' });
  });

  return router;
};

export default createRoutes;
