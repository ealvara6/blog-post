import { Request, Response } from 'express';
import {
  getCommentsService,
  getCommentService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
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

    res.status(200).json({ comments });
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
    const commentId = Number(req.params.commentId);

    const comment = await getCommentService(prisma, commentId);

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

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const userId = Number(req.user?.id);
    const createData = { ...req.body, userId };

    const comment = await createCommentService(prisma, createData);

    res
      .status(201)
      .json({ message: 'Comment created successfully', data: comment });
    return;
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to create comment',
    });
  }
};

export const updateComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.commentId);
    const updateData = req.body;

    const updatedComment = await updateCommentService(prisma, updateData, id);

    if (!updatedComment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Comment updated successfully', data: updatedComment });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to update comment',
    });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.commentId);

    const deletedComment = await deleteCommentService(prisma, id);

    if (!deletedComment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Comment deleted successfully', data: deletedComment });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to delete comment',
    });
  }
};
