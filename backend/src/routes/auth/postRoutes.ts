import { Router } from 'express';
import {
  createPost,
  deletePost,
  updatePost,
} from '../../controllers/postController';
import { PrismaClient } from '@prisma/client/extension';
import {
  createComment,
  deleteComment,
  updateComment,
} from '../../controllers/commentController';

import {
  validateCommentCreation,
  validateCommentDeletion,
  validateCommentUpdate,
  validatePostCreation,
  validatePostDeletion,
  validatePostUpdate,
} from '../../middleware/validators/validationMiddleware';

export const authPostRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router.post('/', validatePostCreation, createPost);

  router
    .route('/:id')
    .put(validatePostUpdate, updatePost)
    .delete(validatePostDeletion, deletePost);

  router.post('/:id/comments', validateCommentCreation, createComment);

  router
    .route('/:id/comments/:commentId')
    .put(validateCommentUpdate, updateComment)
    .delete(validateCommentDeletion, deleteComment);

  return router;
};
export default authPostRoutes;
