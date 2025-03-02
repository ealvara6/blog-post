export const mockPost = {
  id: 101,
  title: 'mock_post_title',
  content: 'mock_post_content',
  published: true,
  userId: 1,
  createdAt: new Date(),
  comments: [
    {
      id: 201,
      content: 'mock_comment_content',
      createdAt: new Date(),
      postId: 101,
      userId: 1,
    },
  ],
};
