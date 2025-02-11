const {
  createNewPost,
  findPost,
  getAllPosts,
} = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const prisma = req.prisma;

    const newPost = await createNewPost(prisma, req.body);

    return res
      .status(201)
      .json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to create new post', details: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const prisma = req.prisma;
    let posts = await getAllPosts(prisma);

    res.status(200).json({
      posts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch posts', details: err.message });
  }
};

const getOnePost = async (req, res) => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(404).json({ error: 'Invalid id input' });
    let post = await findPost(prisma, id);

    if (!post) {
      return res.status(404).json({ error: 'No post found' });
    }

    res.status(200).json({
      post,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch post', details: err.message });
  }
};

module.exports = { getPosts, getOnePost, createPost };
