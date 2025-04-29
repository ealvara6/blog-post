const date = new Date()

export const mockComments = [
  {
    id: 101,
    content: 'mock_content',
    createdAt: date.toString(),
    userId: 1,
    user: {
      id: 1,
      username: 'mock_username',
    },
  },
  {
    id: 101,
    content: 'mock_content',
    createdAt: date.toString(),
    userId: 2,
    user: {
      id: 2,
      username: 'mock_username',
    },
  },
  {
    id: 101,
    content: 'mock_content',
    createdAt: date.toString(),
    userId: 3,
    user: {
      id: 3,
      username: 'mock_username',
    },
  },
]
