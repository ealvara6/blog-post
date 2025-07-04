import { Prisma, User } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

interface CheckUserDTO {
  username: string;
  email: string;
}

export const getUsersService = async (
  prisma: PrismaClient
): Promise<User[]> => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      blogAuthor: true,
      posts: true,
      comments: true,
    },
  });
};

export const checkIfUserExists = async (
  { username, email }: CheckUserDTO,
  prisma: PrismaClient
): Promise<User> => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });
};

export const updateUserService = async (
  prisma: PrismaClient,
  id: number,
  updateData: Partial<User>
): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data: updateData,
  });
};

export const findUser = async (
  prisma: PrismaClient,
  id: number
): Promise<User> => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      blogAuthor: true,
      posts: true,
      comments: true,
    },
  });
};

export const findUserOnEmail = async (
  prisma: PrismaClient,
  email: string
): Promise<User> => {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      email: true,
      blogAuthor: true,
      password: true,
      posts: true,
      comments: true,
    },
  });
};

export const findUserOnUsername = async (
  prisma: PrismaClient,
  username: string
): Promise<User> => {
  return await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      email: true,
      blogAuthor: true,
      password: true,
      posts: true,
      comments: true,
    },
  });
};

export const deleteUserService = async (prisma: PrismaClient, id: number) => {
  await prisma.comment.deleteMany({
    where: { userId: id },
  });

  await prisma.post.deleteMany({
    where: { userId: id },
  });

  return await prisma.user.delete({
    where: { id },
  });
};

export const getUserPostsService = async (prisma: PrismaClient, id: number) => {
  return await prisma.post.findMany({
    where: { userId: id },
    select: {
      id: true,
      createdAt: true,
      title: true,
      content: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};

export const getUserCommentsService = async (
  prisma: PrismaClient,
  id: number
) => {
  return await prisma.comment.findMany({
    where: { userId: id },
    select: {
      id: true,
      createdAt: true,
      content: true,
      postId: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
