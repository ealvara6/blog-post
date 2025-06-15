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
  prisma: PrismaClient,
  limit: number,
  skip: number,
  searchTerm: string,
  categoryId: string
) => {
  const categoryFilter = categoryId
    ? { categories: { some: { id: Number(categoryId) } } }
    : {};
  const searchFilter = searchTerm
    ? {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { content: { contains: searchTerm, mode: 'insensitive' } },
        ],
      }
    : {};

  const whereClause = {
    AND: [categoryFilter, searchFilter],
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        userId: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
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
      skip,
      take: Number(limit),
    }),
    prisma.post.count({
      where: whereClause,
    }),
  ]);

  return [posts, total];
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
