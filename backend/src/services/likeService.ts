import { PrismaClient } from '@prisma/client/extension';

type LikePostDTO = {
  userId: number;
  numericPostId: number;
};

export const likePostService = async (
  prisma: PrismaClient,
  { userId, numericPostId }: LikePostDTO
) => {
  return await prisma.likeOnPost.create({
    data: {
      postId: numericPostId,
      userId,
    },
  });
};
