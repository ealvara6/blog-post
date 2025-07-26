import { PrismaClient } from '@prisma/client/extension';

type LikePostDTO = {
  userId: number;
  postId: number;
};

export const createLikeOnPostService = async (
  prisma: PrismaClient,
  { userId, postId }: LikePostDTO
) => {
  return await prisma.likeOnPost.create({
    data: {
      postId: postId,
      userId,
    },
  });
};

export const deleteLikeOnPostService = async (
  prisma: PrismaClient,
  { userId, postId }: LikePostDTO
) => {
  return await prisma.likeOnPost.delete({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });
};

export const getLikesOnPostService = async (
  prisma: PrismaClient,
  postId: number
) => {
  return await prisma.likeOnPost.count({
    where: { postId },
  });
};

export const postLikedService = async (
  prisma: PrismaClient,
  postId: number,
  userId: number
) => {
  return await prisma.likeOnPost.findFirst({
    where: { postId, userId },
  });
};

export const getLikesOnCommentService = async (
  prisma: PrismaClient,
  commentId: number
) => {
  return await prisma.likeOnComment.count({
    where: { commentId },
  });
};

export const createLikeOnCommentService = async (
  prisma: PrismaClient,
  commentId: number,
  userId: number
) => {
  return await prisma.likeOnComment.create({
    data: {
      commentId,
      userId,
    },
  });
};

export const deleteLikeOnCommentService = async (
  prisma: PrismaClient,
  commentId: number,
  userId: number
) => {
  return await prisma.likeOnComment.delete({
    where: {
      commentId_userId: {
        commentId,
        userId,
      },
    },
  });
};
