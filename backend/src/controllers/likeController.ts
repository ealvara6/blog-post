import { Request, response, Response } from 'express';
import {
  createLikeOnCommentService,
  createLikeOnPostService,
  deleteLikeOnCommentService,
  deleteLikeOnPostService,
  getLikesOnCommentService,
  getLikesOnPostService,
  postLikedService,
} from '../services/likeService';
import { handleError } from '../utils/errorhandler';

export const createLikeOnPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(400).json({ error: 'Not Authorized' });
      return;
    }

    const prisma = req.prisma;
    const userId = req.user.id;
    const { id } = req.params;
    const numericPostId = Number(id);

    const like = await createLikeOnPostService(prisma, {
      userId,
      postId: numericPostId,
    });

    res.status(201).json({ like });
    return;
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to like post',
    });
  }
};

export const deleteLikeOnPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(400).json({ error: 'Not Authorized' });
      return;
    }

    const prisma = req.prisma;
    const userId = req.user?.id;
    const { id } = req.params;
    const numericPostId = Number(id);

    const unlike = await deleteLikeOnPostService(prisma, {
      userId,
      postId: numericPostId,
    });

    res.status(201).json({ unlike });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to unlike post',
    });
  }
};

export const getLikesOnPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const { id } = req.params;

    const likeCount = await getLikesOnPostService(prisma, Number(id));

    res.status(200).json({ likeCount });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to get like count',
    });
  }
};

export const postLiked = async (req: Request, res: Response): Promise<void> => {
  try {
    const prisma = req.prisma;
    const { id } = req.params;
    const userId = req.user?.id;

    const liked = await postLikedService(prisma, Number(id), Number(userId));
    res.status(200).json({ liked: Boolean(liked) });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to check liked post',
    });
  }
};

export const getLikesOnComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.commentId);

    const likeCount = await getLikesOnCommentService(prisma, id);

    res.status(200).json({ likeCount });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to get comment likes',
    });
  }
};

export const createLikeOnComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(400).json({ error: 'Not Authorized ' });
      return;
    }

    const prisma = req.prisma;
    const userId = req.user.id;
    const id = Number(req.params.commentId);

    const like = await createLikeOnCommentService(prisma, id, userId);

    res.status(200).json({ like });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to like comment',
    });
  }
};

export const deleteLikeOnComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(400).json({ error: 'Not Authorized' });
      return;
    }

    const prisma = req.prisma;
    const userId = req.user.id;
    const id = Number(req.params.commentId);

    const unLike = await deleteLikeOnCommentService(prisma, id, userId);

    res.status(200).json({ unLike });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to unlike comment',
    });
  }
};
