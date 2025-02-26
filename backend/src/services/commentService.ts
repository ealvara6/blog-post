import { PrismaClient } from '@prisma/client/extension';
import { Comment } from '@prisma/client';

interface CommentData {
  content: string;
}

export const getCommentsService = async (
  prisma: PrismaClient,
  id: number
): Promise<Comment[]> => {
  return await prisma.comment.findMany({
    where: { postId: id },
    user: {
      select: { username: true },
    },
  });
};

export const getCommentService = async (
  prisma: PrismaClient,
  postId: number,
  commentId: number
): Promise<Comment> => {
  return await prisma.comment.findUnique({
    where: {
      AND: [{ postId }, { id: commentId }],
    },
    user: {
      select: { username: true },
    },
  });
};

export const createCommentService = async (
  prisma: PrismaClient,
  commentData: CommentData
): Promise<Comment> => {
  return await prisma.comment.create({
    data: commentData,
  });
};

export const updateCommentService = async (
  prisma: PrismaClient,
  updateData: Partial<CommentData>,
  id: number
): Promise<Comment> => {
  return await prisma.comment.update({
    where: { id },
    data: updateData,
  });
};
