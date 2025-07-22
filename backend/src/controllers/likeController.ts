import { Request, response, Response } from 'express';
import {
  createLikeOnPostService,
  deleteLikeOnPostService,
  getLikesOnPostService,
  postLikedService,
} from '../services/likeService';

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
    const userId = req.user?.id;
    const { id } = req.params;
    const numericPostId = Number(id);

    const like = await createLikeOnPostService(prisma, {
      userId,
      postId: numericPostId,
    });

    res.status(201).json({ like });
    return;
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to like post', details: err.message });
      return;
    }
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
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to unlike post', details: err.message });
      return;
    }
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
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to get like count', details: err.message });
      return;
    }
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
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to check liked post', details: err.message });
    }
  }
};
