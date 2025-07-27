import { PrismaClient } from '@prisma/client/extension';
import { Router } from 'express';
import {
  updateComment,
  deleteComment,
} from '../../controllers/commentController';
import {
  createLikeOnComment,
  deleteLikeOnComment,
} from '../../controllers/likeController';
import { authenticateToken } from '../../middleware/authMiddleware';
import { validateCommentLike } from '../../middleware/validators/validateLike.validator';
import {
  validateCommentUpdate,
  validateCommentDeletion,
} from '../../middleware/validators/validationMiddleware';

export const authCommentRoutes = (prisma: PrismaClient) => {
  const router = Router();
  router
    .route('/comments/:commentId')
    .put(validateCommentUpdate, updateComment)
    .delete(validateCommentDeletion, deleteComment);

  router
    .route('/comments/:commentId/like')
    .post(authenticateToken, validateCommentLike, createLikeOnComment)
    .delete(authenticateToken, validateCommentLike, deleteLikeOnComment);

  return router;
};

export default authCommentRoutes;
