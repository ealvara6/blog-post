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
        user: {
          id: 2,
          username: 'mock_username',
        },
      },
    ],
    userId: 1,
    user: {
      id: 1,
      username: 'mock_username',
    },
    categories: [
      {
        name: 'mock_name',
        id: 2,
      },
    ],
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
        user: {
          id: 2,
          username: 'mock_username',
        },
      },
    ],
    userId: 1,
    user: {
      id: 1,
      username: 'mock_username',
    },
    categories: [
      {
        name: 'mock_name',
        id: 2,
      },
    ],
  },
]

export const postNoComments = {
  id: 1,
  title: 'mock_title',
  content: 'mock_content',
  comments: [],
  createdAt: new Date().toString(),
  published: true,
  userId: 1,
  user: {
    id: 1,
    username: 'mock_username',
  },
  categories: [
    {
      name: 'mock_name',
      id: 2,
    },
  ],
}
