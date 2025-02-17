import { Request, Response } from 'express';
import { createNewPost, findPost, getAllPosts } from '../services/postService';

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const prisma = req.prisma;

    const newPost = await createNewPost(prisma, req.body);

    res
      .status(201)
      .json({ message: 'Post created successfully', data: newPost });
    return;
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to create new post', details: err.message });
      return;
    }
  }
};

const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const prisma = req.prisma;
    let posts = await getAllPosts(prisma);

    res.status(200).json({
      posts,
    });
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to fetch posts', details: err.message });
      return;
    }
    res.status(500).json({ error: 'An unknown error occured' });
  }
};

const getOnePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(404).json({ error: 'Invalid id input' });
      return;
    }
    let post = await findPost(prisma, id);

    if (!post) {
      res.status(404).json({ error: 'No post found' });
      return;
    }

    res.status(200).json({
      post,
    });
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to fetch post', details: err.message });
      return;
    }
    res.status(500).json({ error: 'An unknown error occured' });
  }
};

export { getPosts, getOnePost, createPost };
