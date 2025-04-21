import { PrismaClient } from '@prisma/client/extension';
import { Comment } from '@prisma/client';
import { connect } from 'http2';

interface CommentData {
  content: string;
  postId: number;
  userId: number;
}

export const getCommentsService = async (
  prisma: PrismaClient,
  id: number
): Promise<Comment[]> => {
  return await prisma.comment.findMany({
    where: { postId: id },
    select: {
      content: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};

export const getCommentService = async (
  prisma: PrismaClient,
  commentId: number
): Promise<Comment> => {
  return await prisma.comment.findUnique({
    where: { id: commentId },
  });
};

export const createCommentService = async (
  prisma: PrismaClient,
  { content, userId, postId }: CommentData
): Promise<Comment> => {
  return await prisma.comment.create({
    data: {
      content,
      post: { connect: { id: postId } },
      user: { connect: { id: userId } },
    },
    include: {
      user: true,
    },
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

export const deleteCommentService = async (
  prisma: PrismaClient,
  id: number
): Promise<Comment> => {
  return await prisma.comment.delete({
    where: { id },
  });
};
