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
import { validateUpdateFields, validateUser } from './validateUser.validator';

export const validateUserProfile = [authenticateToken, checkValidationResults];

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
  canModifyComment,
  validateEmptyBody,
  ...validateComment,
  checkValidationResults,
];

export const validateCommentDeletion = [
  authenticateToken,
  validateCommentId,
  canModifyComment,
];

export const validateUserUpdate = [
  authenticateToken,
  ...validateUpdateFields,
  checkValidationResults,
];

export const validateUserDeletion = [authenticateToken];
