import { Request, Response } from 'express';
import {
  createPostService,
  getPostService,
  getPostsService,
  deletePostService,
  updatePostService,
} from '../services/postService';
import { Category } from '@prisma/client';

type CreatePostProps = {
  title: string;
  content: string;
  userId: number;
  categories: Category[];
};

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const { title, content, categories, userId }: CreatePostProps = req.body;
    const data = {
      title,
      content,
      userId,
      categories: categories.map(({ id }) => ({ id })),
    };

    const newPost = await createPostService(prisma, data);

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

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const skip = (page - 1) * limit;
    const prisma = req.prisma;

    let [posts, total] = await getPostsService(prisma, limit, skip);

    res.status(200).json({
      posts,
      pageInfo: {
        currentPage: page,
        total,
        totalPage: Math.ceil(total / limit),
      },
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

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.id);
    let post = await getPostService(prisma, id);

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
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

export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content, categories } = req.body;
    const prisma = req.prisma;
    const id = Number(req.params.id);
    const data = {
      title,
      content,
      categories: {
        set: categories,
      },
    };

    const post = await updatePostService(prisma, id, data);

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(200).json({
      message: 'Post successfully updated',
      data: post,
    });
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to update post', details: err.message });
      return;
    }
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.id);
    const post = await deletePostService(prisma, id);

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(200).json({
      message: 'Post successfully deleted',
      data: post,
    });
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to delete post', details: err.message });
      return;
    }
    res.status(500).json({ error: 'An unknown error occured' });
  }
};
