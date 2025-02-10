const getPosts = async (req, res) => {
  try {
    const prisma = req.prisma;
    let posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
    });

    res.status(200).json({
      posts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch posts', details: err.message });
  }
};

module.exports = { getPosts };
