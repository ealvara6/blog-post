export const mockPosts = [
  {
    id: 1,
    title: 'mock_title',
    content: 'mock_content',
    createdAt: new Date().toString(),
    published: true,
    comments: [
      {
        id: 1,
        content: 'mock_comment_content',
        createdAt: new Date().toString(),
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
    id: 2,
    title: 'mock_title 2',
    content: 'mock_content',
    createdAt: new Date().toString(),
    published: true,
    comments: [
      {
        id: 1,
        content: 'mock_comment_content',
        createdAt: new Date().toString(),
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

export const postNoComments =   {
  id: 1,
  title: 'mock_title',
  content: 'mock_content',
  createdAt: new Date().toString(),
  published: true,
  userId: 1,
  user: {
    id: 1,
    username: 'mock_username',
  },
}

export default mockPosts
