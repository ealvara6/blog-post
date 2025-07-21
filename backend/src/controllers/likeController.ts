import { Request, Response } from 'express';
import { likePostService } from '../services/likeService';

export const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(400).json({ error: 'Not Authorized' });
      return;
    }

    const prisma = req.prisma;
    const userId = req.user?.id;
    const { postId } = req.body;
    const numericPostId = Number(postId);

    const like = await likePostService(prisma, { userId, numericPostId });

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
