import { NextFunction, Request, Response, Router } from 'express';
import {
  getPosts,
  getOnePost,
  createPost,
} from '../controllers/postController';
import postValidationRules from '../middleware/validatePost';
import { PrismaClient } from '@prisma/client';
import checkValidationResults from '../middleware/checkValidation';

const createPostRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router.use((req: Request, res: Response, next: NextFunction): void => {
    req.prisma = prisma;
    next();
  });

  router
    .route('/')
    .get(getPosts)
    .post([...postValidationRules, checkValidationResults], createPost);

  router.get('/:id', getOnePost);

  return router;
};

export default createPostRoutes;
