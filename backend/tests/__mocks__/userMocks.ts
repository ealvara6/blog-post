import hashPassword from '../../src/utils/hashPassword';

export const createmockUser = async () => {
  const hashedPassword = await hashPassword('mockpassword');
  return {
    id: 1,
    username: 'mockUser',
    email: 'mock@example.com',
    password: hashedPassword,
    createdAt: new Date(),
    blogAuthor: false,
    profilePictureUrl: '/public/avatar.png',
    posts: [
      {
        id: 101,
        title: 'mock_title',
        content: 'mock content',
        published: true,
        createdAt: new Date(),
      },
    ],
    comments: [
      {
        id: 201,
        content: 'mock comment',
        createdAt: new Date(),
        postId: 101,
        userUsername: 'mockUser',
      },
    ],
  };
};

export default createmockUser;
