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
        postId: postId,
        userId,
      },
    },
  });
};
