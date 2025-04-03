export const mockPosts = [
  {
    id: 1,
    published: true,
    content: 'mock_content',
    createdAt: new Date(),
    comments: [
      {
        id: 1,
        content: 'mock_comment_content',
        userId: 1,
      },
    ],
    userId: 1,
    user: {
      id: 1,
      username: 'mock_username',
    },
  },
  {
    id: 1,
    published: true,
    content: 'mock_content',
    createdAt: new Date(),
    comments: [
      {
        id: 1,
        content: 'mock_comment_content',
        userId: 1,
      },
    ],
    userId: 1,
    user: {
      id: 1,
      username: 'mock_username',
    },
  },
]

export default mockPosts
