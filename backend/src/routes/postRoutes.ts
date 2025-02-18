import { NextFunction, Request, Response, Router } from 'express';
import {
  getPosts,
  getOnePost,
  createPost,
  deletePost,
} from '../controllers/postController';
import postValidationRules from '../middleware/validatePost';
import { PrismaClient } from '@prisma/client';
import checkValidationResults from '../middleware/checkValidation';

const createPostRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router
    .route('/')
    .get(getPosts)
    .post([...postValidationRules, checkValidationResults], createPost);

  router.route('/:id').get(getOnePost).delete(deletePost);

  return router;
};

export default createPostRoutes;
