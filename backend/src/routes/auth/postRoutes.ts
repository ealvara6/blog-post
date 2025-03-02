import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticateToken';
import {
  checkValidationResults,
  validateCommentId,
  validateEmptyBody,
  validateId,
  validatePost,
} from '../../middleware/validators';
import {
  createPost,
  deletePost,
  updatePost,
} from '../../controllers/postController';
import { PrismaClient } from '@prisma/client/extension';
import { validateComment } from '../../middleware/validators/validateComment.validator';
import {
  createComment,
  deleteComment,
  updateComment,
} from '../../controllers/commentController';

export const authPostRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router.post(
    '/',
    authenticateToken,
    [...validatePost, checkValidationResults],
    createPost
  );

  router
    .route('/:id')
    .put(
      authenticateToken,
      validateId,
      [validateEmptyBody, ...validatePost, checkValidationResults],
      updatePost
    )
    .delete(authenticateToken, validateId, deletePost);

  router.post(
    '/:id/comments',
    authenticateToken,
    validateId,
    [...validateComment, checkValidationResults],
    createComment
  );

  router
    .route('/:id/comments/:commentId')
    .put(
      authenticateToken,
      validateId,
      validateComment,
      [validateEmptyBody, ...validateComment, checkValidationResults],
      updateComment
    )
    .delete(authenticateToken, validateId, validateCommentId, deleteComment);

  return router;
};
export default authPostRoutes;
