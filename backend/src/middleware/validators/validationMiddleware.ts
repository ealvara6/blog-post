import {
  authenticateToken,
  canModifyComment,
  canModifyPost,
  canModifyUser,
} from '../authMiddleware';
import { checkValidationResults } from './checkValidation.validator';
import { validateEmptyBody } from './emptyBody.validator';
import { validateCommentId, validateId } from './invalidId.validator';
import { validateComment } from './validateComment.validator';
import { validatePost } from './validatePost.validator';
import { validateUpdateFields } from './validateUser.validator';

export const validatePostCreation = [
  authenticateToken,
  ...validatePost,
  checkValidationResults,
];

export const validatePostUpdate = [
  authenticateToken,
  validateId,
  canModifyPost,
  validateEmptyBody,
  ...validatePost,
  checkValidationResults,
];

export const validatePostDeletion = [
  authenticateToken,
  validateId,
  canModifyPost,
];

export const validateCommentCreation = [
  authenticateToken,
  validateId,
  ...validateComment,
  checkValidationResults,
];

export const validateCommentUpdate = [
  authenticateToken,
  validateId,
  canModifyComment,
  validateEmptyBody,
  ...validateComment,
  checkValidationResults,
];

export const validateCommentDeletion = [
  authenticateToken,
  validateId,
  validateCommentId,
  canModifyComment,
];

export const validateUserUpdate = [
  authenticateToken,
  validateId,
  canModifyUser,
  ...validateUpdateFields,
  checkValidationResults,
];

export const validateUserDeletion = [
  authenticateToken,
  validateId,
  canModifyUser,
];
