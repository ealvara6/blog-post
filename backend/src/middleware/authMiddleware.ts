import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { handleError } from '../utils/errorhandler';
import { getPostService } from '../services/postService';
import { getCommentService } from '../services/commentService';
require('dotenv').config();

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token is required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded as { id: string };
    next();
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Invalid or expired token',
    });
  }
};

export const canModifyUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const userIdToDelete = Number(req.params.id);
    const loggedInUserId = Number(req.user?.id);

    if (userIdToDelete !== loggedInUserId) {
      res.status(403).json({
        error: 'Unauthorized: You can only modify your own account',
      });
      return;
    }

    next();
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'failed to authorize user',
    });
  }
};

export const canModifyPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postIdToDelete = Number(req.params.id);
    const userId = Number(req.user?.id);
    const prisma = req.prisma;

    const post = await getPostService(prisma, postIdToDelete);
    if (post.userId !== userId) {
      res.status(403).json({
        error: 'Unauthorized: You can only modify your own posts',
      });
      return;
    }

    next();
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'An unknown error occured',
    });
  }
};

export const canModifyComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, commentId } = req.params;
    const userId = req.user?.id;
    const prisma = req.prisma;

    const comment = await getCommentService(
      prisma,
      Number(id),
      Number(commentId)
    );
    if (comment.userId !== Number(userId)) {
      res.status(403).json({
        error: 'Unauthorized: You can only modify your own comment',
      });
      return;
    }

    next();
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'An unknown error occured',
    });
  }
};
