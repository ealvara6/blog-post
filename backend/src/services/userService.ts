import { Prisma, User } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';

type CheckUserDTO = {
  username: string;
  email: string;
};

type LikedPostsProps = {
  page: number;
  limit: number;
  skip: number;
  prisma: PrismaClient;
  userId?: number;
};

type LikedCommentsProps = {
  page: number;
  limit: number;
  skip: number;
  prisma: PrismaClient;
  userId?: number;
};

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
      profilePictureUrl: true,
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
      profilePictureUrl: true,
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
      posts: {
        select: {
          user: true,
          id: true,
          title: true,
          content: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          userId: true,
          user: true,
          postId: true,
        },
      },
      profilePictureUrl: true,
    },
  });
};

export const deleteUserService = async (prisma: PrismaClient, id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const getUserPostsService = async (
  prisma: PrismaClient,
  userId: number
) => {
  return await prisma.post.findMany({
    where: { userId },
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
  userId: number
) => {
  return await prisma.comment.findMany({
    where: { userId },
    select: {
      id: true,
      createdAt: true,
      content: true,
      postId: true,
      user: {
        select: {
          username: true,
          profilePictureUrl: true,
        },
      },
    },
  });
};

export const getLikedPostsService = async ({
  page,
  limit,
  skip,
  prisma,
  userId,
}: LikedPostsProps) => {
  return await prisma.likeOnPost.findMany({
    where: { userId },
    include: { post: { include: { user: true } } },
    skip,
    take: limit,
  });
};

export const getLikedCommentsService = async ({
  page,
  limit,
  skip,
  prisma,
  userId,
}: LikedCommentsProps) => {
  return await prisma.likeOnComment.findMany({
    where: { userId },
    include: { comment: { include: { user: true } } },
    skip,
    take: limit,
  });
};

export const updateUserAvatarUrlService = async (
  prisma: PrismaClient,
  id: number,
  url: string
) => {
  return await prisma.user.update({
    where: { id },
    data: { profilePictureUrl: url },
  });
};
