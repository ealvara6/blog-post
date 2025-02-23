import request from 'supertest';
import { Express } from 'express';
import createTestServer from '../src/config/testServer';
import { User } from '@prisma/client';

jest.mock('@prisma/client', () => {
  const PrismaClient = jest.fn().mockImplementation(() => ({
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }));
  return { PrismaClient };
});

const mockUser = {
  id: 1,
  username: 'mockUser',
  email: 'mock@example.com',
  password: 'mockpassword',
  createdAt: '2025-01-20T01:47:55.839Z',
  blogAuthor: false,
  posts: [
    {
      id: 101,
      title: 'mock_title',
      content: 'mock content',
      published: true,
      createdAt: '2025-01-20T01:47:55.839Z',
    },
  ],
  comments: [
    {
      id: 201,
      content: 'mock comment',
      createdAt: '2025-01-20T01:47:55.839Z',
      postId: 101,
      userUsername: 'mockUser',
    },
  ],
};

const prismaMock = require('@prisma/client').PrismaClient();

describe('GET /api/users', () => {
  let app: Express;

  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });

  it('should return a list of users with status 200', async () => {
    prismaMock.user.findMany.mockResolvedValue([mockUser]);

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);

    expect(res.body.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          username: expect.any(String),
          email: expect.stringMatching(/@example\.com$/),
          password: expect.any(String),
          createdAt: expect.any(String),
          blogAuthor: expect.any(Boolean),
          posts: expect.arrayContaining([
            expect.objectContaining({
              id: 101,
              title: 'mock_title',
              content: 'mock content',
              published: true,
              createdAt: expect.any(String),
            }),
          ]),
          comments: expect.arrayContaining([
            expect.objectContaining({
              id: 201,
              content: 'mock comment',
              createdAt: expect.any(String),
              postId: 101,
            }),
          ]),
        }),
      ])
    );

    expect(res.body.users.length).toBeGreaterThan(0);
  });

  it('should return an empty list when no users exist', async () => {
    prismaMock.user.findMany.mockResolvedValue([]);

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body.users).toEqual([]);
    expect(res.body.users.length).toBe(0);
  });

  it('should ensure all required fields are present in the user objecst', async () => {
    prismaMock.user.findMany.mockResolvedValue([mockUser]);

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);

    res.body.users.forEach((user: User) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('blogAuthor');
      expect(user).toHaveProperty('posts');
      expect(user).toHaveProperty('comments');
    });
  });

  it('should handle database errors gracefully', async () => {
    prismaMock.user.findMany.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      error: 'Failed to fetch users',
      details: 'Database error',
    });
  });
});

describe('GET /api/users/:id', () => {
  let app: Express;

  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });

  it('should return a user based on the id parameter given', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser);

    const res = await request(app).get('/api/users/1');

    expect(res.statusCode).toBe(200);

    expect(res.body.user).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.stringMatching(/@example\.com$/),
        password: expect.any(String),
        createdAt: expect.any(String),
        blogAuthor: expect.any(Boolean),
        posts: expect.any(Array),
        comments: expect.any(Array),
      })
    );
  });

  it('should return a 404 when no user is found and give an error message', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const res = await request(app).get('/api/users/2');

    expect(res.statusCode).toBe(404);

    expect(res.body).toEqual({
      error: 'No user found',
    });
  });

  it('should return a 404 status code if given an invalid id input', async () => {
    const res = await request(app).get('/api/users/invalid-input-id');

    expect(res.statusCode).toBe(404);

    expect(res.body).toEqual({
      error: 'Invalid id input',
    });
  });

  it('should handle database errors gracefully', async () => {
    prismaMock.user.findUnique.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/users/1');

    expect(res.statusCode).toBe(500);

    expect(res.body).toEqual({
      error: 'Failed to fetch user',
      details: 'Database error',
    });
  });
});

describe('POST /api/users', () => {
  let app: Express;

  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });

  it('should create a new user into the database', async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/users')
      .send({ ...mockUser, confirmPassword: 'mockpassword' });

    expect(res.statusCode).toBe(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'User created successfully',
      })
    );

    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        username: 'mockUser',
        email: 'mock@example.com',
        password: expect.any(String),
      },
      include: {
        posts: true,
        comments: true,
      },
    });
  });

  it('should throw an error when the username given is already in the database', async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      username: 'mockUser',
    });

    const res = await request(app)
      .post('/api/users')
      .send({ ...mockUser, confirmPassword: 'mockpassword' });

    expect(res.statusCode).toBe(409);

    expect(res.body).toEqual(
      expect.objectContaining({
        error: 'username is already associated with an existing account',
      })
    );
  });

  it('should throw an error when the email given is already in the database', async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      email: 'mock@example.com',
    });

    const res = await request(app)
      .post('/api/users')
      .send({ ...mockUser, confirmPassword: 'mockpassword' });

    expect(res.statusCode).toBe(409);

    expect(res.body).toEqual(
      expect.objectContaining({
        error: 'email is already associated with an existing account',
      })
    );
  });

  it('should handle database errors gracefully', async () => {
    prismaMock.user.findFirst.mockRejectedValue(new Error('Database error'));

    const res = await request(app)
      .post('/api/users')
      .send({ ...mockUser, confirmPassword: 'mockpassword' });

    expect(res.statusCode).toBe(500);

    expect(res.body).toEqual({
      error: 'Failed to register user',
      details: 'Database error',
    });
  });
});

describe('PUT /api/users/:id', () => {
  let app: Express;

  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });

  it('Should update an existing user data based on their id', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    prismaMock.user.update.mockResolvedValue({
      ...mockUser,
      email: 'updated@email.com',
    });

    const res = await request(app)
      .put('/api/users/1')
      .send({
        ...mockUser,
        email: 'updated@email.com',
      });

    expect(res.statusCode).toBe(200);

    expect(res.body).toEqual({
      message: 'User successfully updated',
      user: {
        id: 1,
        username: 'mockUser',
        email: 'updated@email.com',
        password: expect.any(String),
        createdAt: expect.any(String),
        blogAuthor: false,
        posts: [
          {
            id: 101,
            title: 'mock_title',
            content: 'mock content',
            published: true,
            createdAt: expect.any(String),
          },
        ],
        comments: [
          {
            id: 201,
            content: 'mock comment',
            createdAt: expect.any(String),
            postId: 101,
            userUsername: 'mockUser',
          },
        ],
      },
    });
  });

  it('Should return a 400 status code if the data is invalid', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    prismaMock.user.update.mockResolvedValue({
      ...mockUser,
      email: 'not-an-email',
    });

    const res = await request(app)
      .put('/api/users/1')
      .send({ ...mockUser, email: 'not-an-email' });

    expect(res.statusCode).toBe(400);

    expect(res.body).toEqual({
      errors: [
        {
          type: 'field',
          value: 'not-an-email',
          msg: 'Invalid email address',
          path: 'email',
          location: 'body',
        },
      ],
    });
  });

  it('Should return a 404 status code if id input is invalid', async () => {
    const res = await request(app)
      .put('/api/users/invalid-id-input')
      .send({ ...mockUser, email: 'updated@email.com' });

    expect(res.statusCode).toBe(404);

    expect(res.body).toEqual({
      error: 'Invalid id input',
    });
  });

  it("Should return a 404 user not found error when trying to update a user that doesn't exist", async () => {
    prismaMock.user.findUnique.mockResolvedValue();

    const res = await request(app)
      .put('/api/users/9999')
      .send({ ...mockUser, email: 'updated@email.com ' });

    expect(res.statusCode).toBe(404);

    expect(res.body).toEqual({
      error: 'User does not exist',
    });
  });

  it('Should handle database errors gracefully', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    prismaMock.user.update.mockRejectedValue(
      new Error('Failed to update user')
    );

    const res = await request(app)
      .put('/api/users/1')
      .send({ ...mockUser, email: 'updated@email.com' });

    expect(res.statusCode).toBe(500);

    expect(res.body).toEqual({
      error: 'Failed to update user',
      details: 'Failed to update user',
    });
  });
});

describe('DELETE /api/users/:id', () => {
  let app: Express;
  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });

  it('Should successfully delete a user from the database', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    prismaMock.user.delete.mockResolvedValue(mockUser);

    const res = await request(app).delete('/api/users/1');

    expect(res.statusCode).toBe(200);

    expect(res.body).toEqual({
      message: 'User successfully deleted',
      user: expect.objectContaining({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.stringMatching(/@example\.com$/),
        password: expect.any(String),
        createdAt: expect.any(String),
        blogAuthor: expect.any(Boolean),
        posts: expect.any(Array),
        comments: expect.any(Array),
      }),
    });
  });

  it('Should return a 404 error when the user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const res = await request(app).delete('/api/users/9999');

    expect(res.statusCode).toBe(404);

    expect(res.body).toEqual({
      error: 'User does not exist',
    });
  });

  it('should return a 400 status code if id format is invalid', async () => {
    const res = await request(app).delete('/api/users/invalid-id-input');
    expect(res.statusCode).toBe(404);

    expect(res.body).toEqual({
      error: 'Invalid id input',
    });
  });

  it('should gracefully handle a 500 status code database error', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser);
    prismaMock.user.delete.mockRejectedValue(
      new Error('Failed to delete user')
    );
    const res = await request(app).delete('/api/users/1');

    expect(res.statusCode).toBe(500);

    expect(res.body).toEqual({
      error: 'Failed to delete user',
      details: 'Failed to delete user',
    });
  });
});
