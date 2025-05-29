import { Post } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

interface CreatePostDTO {
  title: string;
  content?: string;
  userId: number;
  categories: { id: number }[];
}

export const createPostService = async (
  prisma: PrismaClient,
  { title, content, userId, categories }: CreatePostDTO
): Promise<Post> => {
  console.log(categories);
  return await prisma.post.create({
    data: {
      title,
      content,
      userId,
      categories: {
        connect: categories.map(({ id }) => ({ id })),
      },
    },
  });
};

export const getPostsService = async (
  prisma: PrismaClient
): Promise<Post[]> => {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      userId: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      createdAt: true,
      comments: {
        select: {
          content: true,
          id: true,
          userId: true,
        },
      },
    },
  });
};

export const getPostService = async (
  prisma: PrismaClient,
  id: number
): Promise<Post> => {
  return await prisma.post.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      userId: true,
      categories: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      createdAt: true,
      comments: {
        select: {
          content: true,
          id: true,
          userId: true,
          createdAt: true,
          user: true,
        },
      },
    },
  });
};

export const updatePostService = async (
  prisma: PrismaClient,
  id: number,
  data: Object
): Promise<Post> => {
  return await prisma.post.update({
    where: { id },
    data: data,
  });
};

export const deletePostService = async (
  prisma: PrismaClient,
  id: number
): Promise<Post> => {
  await prisma.comment.deleteMany({
    where: { postId: id },
  });
  return await prisma.post.delete({
    where: { id },
  });
};
