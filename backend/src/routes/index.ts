import { Request, Response, Router } from 'express';
import authRoutes from './auth/authRoutes';
import publicRoutes from './publicRoutes';
import authPostRoutes from './auth/postRoutes';
import { PrismaClient } from '@prisma/client';
import { prismaMiddleWare } from '../middleware/prismaMiddleware';
import authUserRoutes from './auth/userRoutes';
import authCommentRoutes from './auth/commentRoutes';

export const createRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router.use(prismaMiddleWare(prisma));
  router.use('/', publicRoutes(prisma));
  router.use('/auth', authRoutes(prisma));
  router.use('/auth/posts', authPostRoutes(prisma));
  router.use('/auth/users', authUserRoutes(prisma));
  router.use('/auth/comments', authCommentRoutes(prisma));

  router.get('/health', (req: Request, res: Response): void => {
    res.status(200).json({ status: 'This is a public health check' });
  });

  router.all('*', (req: Request, res: Response): void => {
    res.status(404).json({ error: 'Not found' });
  });

  return router;
};

export default createRoutes;
