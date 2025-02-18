import { Post, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

interface CreatePostDTO {
  title: string;
  content?: string;
  userId: number;
}

const createNewPost = async (
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

const getAllPosts = async (prisma: PrismaClient): Promise<Post[]> => {
  return await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
  });
};

const findPost = async (prisma: PrismaClient, id: number): Promise<Post> => {
  return await prisma.post.findUnique({
    where: { id: id },
  });
};

const deletePostService = async (
  prisma: PrismaClient,
  id: number
): Promise<Post> => {
  return await prisma.post.delete({
    where: { id: id },
  });
};

export { createNewPost, getAllPosts, findPost, deletePostService };
