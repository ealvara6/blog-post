const createNewPost = async (prisma, { title, content, userId }) => {
  return await prisma.post.create({
    data: {
      title,
      content,
      userId,
    },
  });
};

const getAllPosts = async (prisma) => {
  return await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
  });
};

const findPost = async (prisma, id) => {
  return await prisma.post.findUnique({
    where: { id: id },
  });
};

module.exports = { createNewPost, getAllPosts, findPost };
