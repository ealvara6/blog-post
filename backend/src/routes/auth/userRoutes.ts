import { Router } from 'express';
import { PrismaClient } from '@prisma/client/extension';
import {
  deleteUser,
  getLikedComments,
  getLikedPosts,
  getUser,
  getUserComments,
  getUserPosts,
  updateUser,
  uploadUserAvatar,
} from '../../controllers/userController';
import {
  validateUserDeletion,
  validateUserUpdate,
} from '../../middleware/validators/validationMiddleware';
import { authenticateToken } from '../../middleware/authMiddleware';
import { avatarUpload } from '../../middleware/uploadMiddleware';

export const authUserRoutes = (prisma: PrismaClient) => {
  const router = Router();

  router
    .route('/me')
    .get(authenticateToken, getUser)
    .put(validateUserUpdate, updateUser)
    .delete(validateUserDeletion, deleteUser);

  router.get('/posts/me', authenticateToken, getUserPosts);
  router.get('/comments/me', authenticateToken, getUserComments);
  router.get('/likes/posts/me', authenticateToken, getLikedPosts);
  router.get('/likes/comments/me', authenticateToken, getLikedComments);

  router.post(
    '/avatar',
    authenticateToken,
    avatarUpload.single('avatar'),
    uploadUserAvatar
  );

  return router;
};

export default authUserRoutes;
