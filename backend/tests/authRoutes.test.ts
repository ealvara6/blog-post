import request from 'supertest';
import { Express } from 'express';
import createTestServer from '../src/config/testServer';
import createmockUser from './__mocks__/userMocks';
import { User } from '@prisma/client';

jest.mock('@prisma/client', () => {
  const PrismaClient = jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
    },
  }));

  return { PrismaClient };
});

const prismaMock = require('@prisma/client').PrismaClient();

describe('Auth Routes', () => {
  let app: Express;
  let testUser: User;

  beforeEach(async () => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
    testUser = await createmockUser();
  });

  describe('POST api/auth/register', () => {
    describe('Sucessful scenarios', () => {
      it('should register a new user and return a status 201', async () => {
        prismaMock.user.findFirst.mockResolvedValue(null);
        prismaMock.user.create.mockResolvedValue(testUser);

        const res = await request(app)
          .post('/api/auth/register')
          .send({
            ...testUser,
            password: 'mockpassword',
            confirmPassword: 'mockpassword',
          });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('newUser');

        expect(res.body).toEqual(
          expect.objectContaining({
            message: 'User created successfully',
            newUser: expect.objectContaining({
              id: expect.any(Number),
              username: expect.any(String),
              email: expect.any(String),
              password: expect.any(String),
              createdAt: expect.any(String),
              blogAuthor: expect.any(Boolean),
            }),
          })
        );
      });
    });
    describe('Failure scenarios', () => {
      it('should reuturn an error when the given username is already in the database and return a status 409', async () => {
        prismaMock.user.findFirst.mockResolvedValue({
          ...testUser,
          username: 'mockUser',
        });

        const res = await request(app)
          .post('/api/auth/register')
          .send({
            ...testUser,
            password: 'mockpassword',
            confirmPassword: 'mockpassword',
          });

        expect(res.statusCode).toBe(409);

        expect(res.body).toEqual(
          expect.objectContaining({
            error: 'username is already associated with an existing account',
          })
        );
      });

      it('should return an error when the given email is already in the database and return a status 409', async () => {
        prismaMock.user.findFirst.mockResolvedValue({
          email: 'mock@example.com',
        });

        const res = await request(app)
          .post('/api/auth/register')
          .send({
            ...testUser,
            password: 'mockpassword',
            confirmPassword: 'mockpassword',
          });

        expect(res.statusCode).toBe(409);

        expect(res.body).toEqual(
          expect.objectContaining({
            error: 'email is already associated with an existing account',
          })
        );
      });

      it('should handle database errors gracefully', async () => {
        prismaMock.user.findFirst.mockRejectedValue(
          new Error('Database error')
        );

        const res = await request(app)
          .post('/api/auth/register')
          .send({
            ...testUser,
            password: 'mockpassword',
            confirmPassword: 'mockpassword',
          });

        expect(res.statusCode).toBe(500);

        expect(res.body).toEqual({
          error: 'Failed to register user',
          details: 'Database error',
        });
      });
    });
  });

  describe('POST api/auth/login', () => {
    it('should login user with valid credentials', async () => {
      prismaMock.user.findUnique.mockResolvedValue(testUser);
      const res = await request(app)
        .post(`/api/auth/login`)
        .send({ email: testUser.email, password: 'mockpassword' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
    });

    it('should reject invalid credentials', async () => {
      prismaMock.user.findUnique.mockResolvedValue(testUser);

      const res = await request(app)
        .post(`/api/auth/login`)
        .send({ email: testUser.email, password: 'incorectpassword' });

      console.log(res.body);

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Password is incorrect');
    });
  });
});
