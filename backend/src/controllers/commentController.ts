import { Request, Response } from 'express';
import {
  getCommentsService,
  getCommentService,
} from '../services/commentService';
import { handleError } from '../utils/errorhandler';

export const getComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.id);

    const comments = await getCommentsService(prisma, id);

    if (!comments) {
      res.status(404).json({ error: 'Comments not found ' });
      return;
    }

    res.status(200).json({ data: comments });
    return;
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to fetch comments',
    });
  }
};

export const getComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const postId = Number(req.params.id);
    const commentId = Number(req.params.commentId);

    const comment = await getCommentService(prisma, postId, commentId);

    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    res.status(200).json({ data: comment });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to fetch comment',
    });
  }
};
