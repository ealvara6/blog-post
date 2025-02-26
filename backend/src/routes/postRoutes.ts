import { Router } from 'express';
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from '../controllers/postController';
import { validateCommentId, validateId } from '../middleware/validators';
import { checkValidationResults } from '../middleware/validators/checkValidation.validator';
import { validatePost } from '../middleware/validators';
import { validateEmptyBody } from '../middleware/validators';
import { PrismaClient } from '@prisma/client/extension';
import {
  getComments,
  getComment,
  createComment,
  updateComment,
} from '../controllers/commentController';
import { validateComment } from '../middleware/validators/validateComment.validator';

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

  router
    .route('/:id/comments')
    .get([validateId, checkValidationResults], getComments)
    .post([...validateComment, checkValidationResults], createComment);

  router
    .route('/:id/comments/:commentId')
    .get([validateId, validateCommentId, checkValidationResults], getComment)
    .put(
      [
        validateId,
        validateCommentId,
        validateEmptyBody,
        ...validateComment,
        checkValidationResults,
      ],
      updateComment
    );

  return router;
};

export default createPostRoutes;
