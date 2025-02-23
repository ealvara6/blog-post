import { Post, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

interface CreatePostDTO {
  title: string;
  content?: string;
  userId: number;
}

export const createPostService = async (
  prisma: PrismaClient,
  { title, content, userId }: CreatePostDTO
): Promise<Post> => {
  return await prisma.post.create({
    data: {
      title,
      content,
      userId,
    },
  });
};

export const getPostsService = async (
  prisma: PrismaClient
): Promise<Post[]> => {
  return await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
  });
};

export const getPostService = async (
  prisma: PrismaClient,
  id: number
): Promise<Post> => {
  return await prisma.post.findUnique({
    where: { id: id },
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
  return await prisma.post.delete({
    where: { id: id },
  });
};
