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
import { authenticateToken } from '../../middleware/authMiddleware';
import { validatePostLike } from '../../middleware/validators/validateLike.validator';
import { likePost } from '../../controllers/likeController';

export const authPostRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router.post('/', validatePostCreation, createPost);

  router
    .route('/:id')
    .put(validatePostUpdate, updatePost)
    .delete(validatePostDeletion, deletePost);

  router.route('/:id/like').post(authenticateToken, validatePostLike, likePost);

  router.post('/:id/comments', validateCommentCreation, createComment);

  router
    .route('/comments/:commentId')
    .put(validateCommentUpdate, updateComment)
    .delete(validateCommentDeletion, deleteComment);

  return router;
};
export default authPostRoutes;
