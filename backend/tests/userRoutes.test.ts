import request from 'supertest';
import { Express } from 'express';
import createTestServer from '../src/config/testServer';
import { User } from '@prisma/client';
import { createmockUser } from './__mocks__/userMocks';

jest.mock('@prisma/client', () => {
  const PrismaClient = jest.fn().mockImplementation(() => ({
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
  }));
  return { PrismaClient };
});

const prismaMock = require('@prisma/client').PrismaClient();

describe('user routes', () => {
  let app: Express;
  let testUser: User;

  beforeEach(async () => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
    testUser = await createmockUser();
  });
  describe('GET /api/users', () => {
    it('should return a list of users with status 200', async () => {
      prismaMock.user.findMany.mockResolvedValue([testUser]);

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
      prismaMock.user.findMany.mockResolvedValue([testUser]);

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
    it('should return a user based on the id parameter given', async () => {
      prismaMock.user.findUnique.mockResolvedValue(testUser);

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

    it('should return a 404 status code if given an invalid id input', async () => {
      const res = await request(app).get('/api/users/me/invalid-input-id');

      expect(res.statusCode).toBe(404);

      expect(res.body).toEqual({
        error: 'Not found',
      });
    });

    it('should handle database errors gracefully', async () => {
      prismaMock.user.findUnique.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/api/users/1');

      expect(res.statusCode).toBe(500);

      expect(res.body).toEqual({
        error: 'Failed to fetch user on username',
        details: 'Database error',
      });
    });
  });
});
