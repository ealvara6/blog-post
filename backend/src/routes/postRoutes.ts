import { Router } from 'express';
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from '../controllers/postController';
import { validateId } from '../middleware/validators';
import { checkValidationResults } from '../middleware/validators/checkValidation.validator';
import { validatePost } from '../middleware/validators';
import { validateEmptyBody } from '../middleware/validators';
import { PrismaClient } from '@prisma/client/extension';

export const createPostRoutes = (prisma: PrismaClient): Router => {
  const router = Router();

  router
    .route('/')
    .get(getPosts)
    .post([...validatePost, checkValidationResults], createPost);

  router
    .route('/:id')
    .get(validateId, getPost)
    .delete(validateId, deletePost)
    .put(
      [validateId, validateEmptyBody, ...validatePost, checkValidationResults],
      updatePost
    );

  return router;
};

export default createPostRoutes;
