import request from 'supertest';
import { Express } from 'express';
import createTestServer from '../src/config/testServer';
import createmockUser from './__mocks__/userMocks';
import { mockComment } from './__mocks__/commentMocks';
import { mockPost } from './__mocks__/postMocks';
import { User } from '@prisma/client';

jest.mock('@prisma/client', () => {
  const PrismaClient = jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    post: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
    },
    comment: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
    },
  }));

  return { PrismaClient };
});

const prismaMock = require('@prisma/client').PrismaClient();
const TEST_POST_ID = 101;
const TEST_COMMENT_ID = 201;
const UPDATED_MOCK_CONTENT = 'updated_mock_content';

describe('Auth Routes', () => {
  let app: Express;
  let testUser: User;
  let authToken: string;

  beforeEach(async () => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
    testUser = await createmockUser();

    prismaMock.user.findUnique.mockResolvedValue(testUser);
    const loginRes = await request(app)
      .post('/api/auth/login')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ email: testUser.email, password: 'mockpassword' });
    authToken = loginRes.body.token;
  });

  describe('GET api calls', () => {
    describe('GET api/auth/me', () => {
      describe('Successful scenarios', () => {
        it('should return status 200 and retrive user information', async () => {
          prismaMock.user.findUnique.mockResolvedValue(testUser);

          const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${authToken}`);

          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty('user');
        });
      });

      describe('Failure scenarios', () => {
        it('should return a status 401 if user is not authenticated', async () => {
          const res = await request(app).get('/api/auth/me');

          expect(res.statusCode).toBe(401);
          expect(res.body).toHaveProperty('error');
        });

        it('should return a status 404 when no user is found', async () => {
          prismaMock.user.findUnique.mockResolvedValue(null);

          const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${authToken}`);

          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toBe('User not found');
        });

        it('should handle database errors gracefully', async () => {
          prismaMock.user.findUnique.mockRejectedValue(
            new Error('Database error')
          );

          const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${authToken}`);

          expect(res.statusCode).toBe(500);
          expect(res.body).toHaveProperty('error');
          expect(res.body).toEqual({
            error: 'Failed to get user profile',
            details: 'Database error',
          });
        });
      });
    });
  });

  describe('POST api calls', () => {
    describe('POST api/auth/register', () => {
      describe('Sucessful scenarios', () => {
        it('should register a new user and return a status 201', async () => {
          prismaMock.user.findFirst.mockResolvedValue(null);
          prismaMock.user.create.mockResolvedValue(testUser);

          const res = await request(app)
            .post('/api/register')
            .set('Authorization', `Bearer ${authToken}`)
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
        it('should return an error when the given username is already in the database and return a status 409', async () => {
          prismaMock.user.findFirst.mockResolvedValue({
            ...testUser,
            username: 'mockUser',
          });

          const res = await request(app)
            .post('/api/register')
            .set('Authorization', `Bearer ${authToken}`)
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
            .post('/api/register')
            .set('Authorization', `Bearer ${authToken}`)
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
            .post('/api/register')
            .set('Authorization', `Bearer ${authToken}`)
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
          .set('Authorization', `Bearer ${authToken}`)
          .send({ email: testUser.email, password: 'mockpassword' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
      });

      it('should reject invalid credentials', async () => {
        prismaMock.user.findUnique.mockResolvedValue(testUser);

        const res = await request(app)
          .post(`/api/auth/login`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({ email: testUser.email, password: 'incorectpassword' });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('Password is incorrect');
      });
    });

    describe('POST /api/auth/posts', () => {
      it('should create a new post', async () => {
        const newPost = {
          title: 'mock_post_title',
          content: 'mock_post_content',
          userId: 1,
        };

        prismaMock.post.create.mockResolvedValue({
          id: 201,
          ...newPost,
          published: true,
          createdAt: new Date(),
        });

        const res = await request(app)
          .post('/api/auth/posts')
          .set('Authorization', `Bearer ${authToken}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send(newPost);

        expect(res.statusCode).toBe(201);

        expect(res.body).toEqual(
          expect.objectContaining({
            message: 'Post created successfully',
            data: expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              content: expect.any(String),
              published: expect.any(Boolean),
              userId: expect.any(Number),
              createdAt: expect.any(String),
            }),
          })
        );
      });

      it('should create a new post with no content added', async () => {
        const newPost = {
          title: 'post_mock_title',
          userId: 1,
        };

        prismaMock.post.create.mockResolvedValue({
          id: 201,
          ...newPost,
          published: true,
          createdAt: new Date(),
        });

        const res = await request(app)
          .post('/api/auth/posts')
          .set('Authorization', `Bearer ${authToken}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send(newPost);

        expect(res.statusCode).toBe(201);

        expect(res.body).toEqual(
          expect.objectContaining({
            message: 'Post created successfully',
            data: expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              published: expect.any(Boolean),
              userId: expect.any(Number),
              createdAt: expect.any(String),
            }),
          })
        );
      });

      it('should throw a 400 error when a title is not given', async () => {
        const newPost = {
          title: '',
          userId: 1,
        };

        prismaMock.post.create.mockResolvedValue({
          id: 201,
          ...newPost,
          published: true,
          createdAt: new Date(),
        });

        const res = await request(app)
          .post('/api/auth/posts')
          .set('Authorization', `Bearer ${authToken}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send(newPost);

        expect(res.statusCode).toBe(400);
        expect(res.body.errors.length).toBeGreaterThan(0);

        expect(res.body.errors[0]).toEqual(
          expect.objectContaining({
            type: 'field',
            value: '',
            msg: 'Post must have a title',
            path: 'title',
            location: 'body',
          })
        );
      });

      it('should handle database errors gracefully', async () => {
        prismaMock.post.create.mockRejectedValue(new Error('database error'));

        const res = await request(app)
          .post('/api/auth/posts')
          .set('Authorization', `Bearer ${authToken}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({ title: 'mock_post_title' });

        expect(res.statusCode).toBe(500);

        expect(res.body).toEqual({
          error: 'Failed to create new post',
          details: 'database error',
        });
      });
    });

    describe('POST /api/auth/posts/:id/comments', () => {
      describe('Successful scenarios', () => {
        it('Should create a new comment with a status 201', async () => {
          prismaMock.comment.create.mockResolvedValue(mockComment);

          const res = await request(app)
            .post(`/api/auth/posts/${TEST_POST_ID}/comments`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(mockComment);

          expect(res.statusCode).toBe(201);
          expect(res.body).toHaveProperty('data');
          expect(res.body).toEqual({
            message: 'Comment created successfully',
            data: {
              id: expect.any(Number),
              postId: expect.any(Number),
              content: expect.any(String),
              userId: expect.any(Number),
              createdAt: expect.any(String),
              user: {
                username: expect.any(String),
              },
            },
          });
        });
      });

      describe('Failure scenarios', () => {
        it('should handle database errors gracefully', async () => {
          prismaMock.comment.create.mockRejectedValue(
            new Error('Database error')
          );

          const res = await request(app)
            .post(`/api/auth/posts/${TEST_POST_ID}/comments`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(mockComment);

          expect(res.statusCode).toBe(500);
          expect(res.body).toHaveProperty('error');
          expect(res.body).toEqual({
            error: 'Failed to create comment',
            details: 'Database error',
          });
        });
      });

      describe('Validation scenarios', () => {
        it('Should return an error when no content is provided with a status 400', async () => {
          const res = await request(app)
            .post(`/api/auth/posts/${TEST_POST_ID}/comments`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ content: '' });

          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors[0]).toEqual(
            expect.objectContaining({
              msg: 'Comment must have content',
            })
          );
        });

        it('should return an error when content exceeds 300 characters and return a status 400', async () => {
          const res = await request(app)
            .post(`/api/auth/posts/${TEST_POST_ID}/comments`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ content: 'a'.repeat(301) });

          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors[0]).toEqual(
            expect.objectContaining({
              msg: 'Comment cannot exceed 300 characters',
            })
          );
        });
      });
    });
  });

  describe('PUT api calls', () => {
    describe('PUT /api/auth/users/:id', () => {
      it('Should update an existing user data based on their id', async () => {
        prismaMock.user.findUnique.mockResolvedValue(testUser);
        prismaMock.user.update.mockResolvedValue({
          ...testUser,
          email: 'updated@email.com',
        });

        const res = await request(app)
          .put('/api/auth/users/1')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            ...testUser,
            email: 'updated@email.com',
          });

        expect(res.statusCode).toBe(200);

        expect(res.body).toEqual({
          message: 'User successfully updated',
          updatedUser: {
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
        prismaMock.user.findUnique.mockResolvedValue(testUser);
        prismaMock.user.update.mockResolvedValue({
          ...testUser,
          email: 'not-an-email',
        });

        const res = await request(app)
          .put('/api/auth/users/1')
          .set('Authorization', `Bearer ${authToken}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({ ...testUser, email: 'not-an-email' });

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
          .put('/api/auth/users/invalid-id-input')
          .set('Authorization', `Bearer ${authToken}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({ ...testUser, email: 'updated@email.com' });

        expect(res.statusCode).toBe(404);

        expect(res.body).toEqual({
          error: 'Invalid id input',
        });
      });

      it("Should return a 404 user not found error when trying to update a user that doesn't exist", async () => {
        prismaMock.user.findUnique.mockResolvedValue();

        const res = await request(app)
          .put(`/api/auth/users/1`)
          .set('Authorization', `Bearer ${authToken}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({ ...testUser, email: 'updated@email.com ' });

        expect(res.statusCode).toBe(404);

        expect(res.body).toEqual({
          error: 'User does not exist',
        });
      });

      it('Should handle database errors gracefully', async () => {
        prismaMock.user.findUnique.mockResolvedValue(testUser);
        prismaMock.user.update.mockRejectedValue(
          new Error('Failed to update user')
        );

        const res = await request(app)
          .put('/api/auth/users/1')
          .set('Authorization', `Bearer ${authToken}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({ ...testUser, email: 'updated@email.com' });

        expect(res.statusCode).toBe(500);

        expect(res.body).toEqual({
          error: 'Failed to update user',
          details: 'Failed to update user',
        });
      });

      it('should return a 403 error if the logged-in user is not authorized to update the user', async () => {
        const res = await request(app)
          .put('/api/auth/users/2')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(
          'Unauthorized: You can only modify your own account'
        );
      });
    });

    describe('PUT /api/auth/posts/:id', () => {
      let app: Express;
      beforeEach(() => {
        jest.clearAllMocks();
        app = createTestServer(prismaMock);
      });

      it('Should successfully update a post', async () => {
        prismaMock.post.findUnique.mockResolvedValue(mockPost);
        prismaMock.post.update.mockResolvedValue({
          ...mockPost,
          title: 'Updated title',
        });

        const res = await request(app)
          .put('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ title: 'Updated title' });

        expect(res.statusCode).toBe(200);

        expect(res.body).toEqual({
          message: 'Post successfully updated',
          data: expect.objectContaining({
            title: 'Updated title',
          }),
        });
      });

      it('Should successfully update only provided fields', async () => {
        prismaMock.post.update.mockResolvedValue({
          ...mockPost,
          title: 'Updated Title',
        });

        const res = await request(app)
          .put('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ title: 'Updated Title' });

        expect(res.statusCode).toBe(200);

        expect(res.body.data.title).toBe('Updated Title');
        expect(res.body.data.content).toBe(mockPost.content);
      });

      it('Should validate title length', async () => {
        const res = await request(app)
          .put('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ title: 'a'.repeat(100) });

        expect(res.statusCode).toBe(400);
        expect(res.body.errors[0].msg).toBe(
          'Title must be less than 50 characters long'
        );
      });

      it('Should return 400 if no update data is provided', async () => {
        const res = await request(app)
          .put('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`)
          .send({});

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
          error: 'Request body cannot be empty',
          message: 'Please provide data to update',
        });
      });

      it('Should return a 400 status code if the data is invalid', async () => {
        prismaMock.post.update.mockResolvedValue({ ...mockPost, title: '' });

        const res = await request(app)
          .put('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ title: '' });

        expect(res.statusCode).toBe(400);

        expect(res.body).toEqual({
          errors: [
            {
              type: 'field',
              value: '',
              msg: 'Post must have a title',
              path: 'title',
              location: 'body',
            },
          ],
        });
      });

      it('Should return a 404 status code if id input is invalid', async () => {
        const res = await request(app)
          .put('/api/auth/posts/invalid-id-input')
          .set('Authorization', `Bearer ${authToken}`)
          .send(mockPost);

        expect(res.statusCode).toBe(404);
      });

      it('Should return a 404 status code if a post is not found', async () => {
        prismaMock.post.update.mockResolvedValue(null);

        const res = await request(app)
          .put('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ title: 'Mock title' });

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
          error: 'Post not found',
        });
      });

      it('Should handle database errors gracefully', async () => {
        prismaMock.post.update.mockRejectedValue(new Error('Database error'));

        const res = await request(app)
          .put('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ title: 'Updated title ' });

        expect(res.statusCode).toBe(500);

        expect(res.body).toEqual({
          error: 'Failed to update post',
          details: 'Database error',
        });
      });

      it('should return a 403 error if the logged-in user is not authorized to update the post', async () => {
        prismaMock.post.findUnique.mockResolvedValue({
          ...mockPost,
          userId: 2,
        });

        const res = await request(app)
          .put('/api/auth/posts/201')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ title: 'updated_title' });

        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(
          'Unauthorized: You can only modify your own posts'
        );
      });
    });

    describe('PUT /api/auth/posts/:id/comments/:commentId', () => {
      describe('Successful scenarios', () => {
        it('should successfully update a comment and return status 200', async () => {
          prismaMock.comment.findUnique.mockResolvedValue(mockComment);
          prismaMock.comment.update.mockResolvedValue({
            ...mockComment,
            content: UPDATED_MOCK_CONTENT,
          });

          const res = await request(app)
            .put(`/api/auth/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ content: 'updated_mock_content' });

          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty('data');
          expect(res.body).toEqual({
            message: 'Comment updated successfully',
            data: expect.objectContaining({
              content: 'updated_mock_content',
            }),
          });
        });

        it('should successfully updated only provided fields and return status 200', async () => {
          prismaMock.comment.update.mockResolvedValue({
            ...mockComment,
            content: UPDATED_MOCK_CONTENT,
          });

          const res = await request(app)
            .put(`/api/auth/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ content: UPDATED_MOCK_CONTENT });

          expect(res.statusCode).toBe(200);
          expect(res.body.data.content).toBe(UPDATED_MOCK_CONTENT);
          expect(res.body.data.id).toBe(201);
        });
      });

      describe('Failure scenarios', () => {
        it('should handle database errors gracefully', async () => {
          prismaMock.comment.update.mockRejectedValue(
            new Error('Database error')
          );

          const res = await request(app)
            .put(`/api/auth/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ content: UPDATED_MOCK_CONTENT });

          expect(res.statusCode).toBe(500);
          expect(res.body).toHaveProperty('error');
          expect(res.body).toEqual({
            error: 'Failed to update comment',
            details: 'Database error',
          });
        });

        it('should return an error if comment is not found and return a status 404', async () => {
          prismaMock.comment.update.mockResolvedValue(null);

          const res = await request(app)
            .put(`/api/auth/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ content: UPDATED_MOCK_CONTENT });

          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toBe('Comment not found');
        });

        it('should return a 403 error if the logged-in user is not authorized to update the comment', async () => {
          prismaMock.comment.findUnique.mockResolvedValue({
            ...mockComment,
            userId: 2,
          });

          const res = await request(app)
            .put('/api/auth/posts/201/comments/301')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ content: 'updated_content' });

          expect(res.statusCode).toBe(403);
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toBe(
            'Unauthorized: You can only modify your own comment'
          );
        });
      });
    });
  });

  describe('DELETE api calls', () => {
    describe('DELETE /api/users/:id', () => {
      it('Should successfully delete a user from the database', async () => {
        prismaMock.user.findUnique.mockResolvedValue(testUser);
        prismaMock.user.delete.mockResolvedValue(testUser);

        const res = await request(app)
          .delete('/api/auth/users/1')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);

        expect(res.body).toEqual({
          message: 'User successfully deleted',
          deletedUser: expect.objectContaining({
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

        const res = await request(app)
          .delete('/api/auth/users/1')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(404);

        expect(res.body).toEqual({
          error: 'User does not exist',
        });
      });

      it('should return a 400 status code if id format is invalid', async () => {
        const res = await request(app)
          .delete('/api/auth/users/invalid-id-input')
          .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toBe(404);

        expect(res.body).toEqual({
          error: 'Invalid id input',
        });
      });

      it('should gracefully handle a 500 status code database error', async () => {
        prismaMock.user.findUnique.mockResolvedValue(testUser);
        prismaMock.user.delete.mockRejectedValue(
          new Error('Failed to delete user')
        );
        const res = await request(app)
          .delete('/api/auth/users/1')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(500);

        expect(res.body).toEqual({
          error: 'Failed to delete user',
          details: 'Failed to delete user',
        });
      });

      it('should return a 403 error if the logged-in user is not authorized to delete the user', async () => {
        const res = await request(app)
          .delete('/api/auth/users/2')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(
          'Unauthorized: You can only modify your own account'
        );
      });
    });

    describe('DELETE /api/auth/posts/:id', () => {
      let app: Express;
      beforeEach(() => {
        jest.clearAllMocks();
        app = createTestServer(prismaMock);
      });

      it("should successfully delete a user's post", async () => {
        prismaMock.post.findUnique.mockResolvedValue(mockPost);
        prismaMock.post.delete.mockResolvedValue(mockPost);

        const res = await request(app)
          .delete('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(200);

        expect(res.body).toEqual({
          message: 'Post successfully deleted',
          data: expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            content: expect.any(String),
            published: expect.any(Boolean),
            userId: expect.any(Number),
            createdAt: expect.any(String),
            comments: expect.arrayContaining([expect.any(Object)]),
          }),
        });
      });

      it('Should return a 404 error when the post does not exist', async () => {
        prismaMock.post.delete.mockResolvedValue(null);

        const res = await request(app)
          .delete('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(404);

        expect(res.body).toEqual({
          error: 'Post not found',
        });
      });

      it('Should return a 404 error when an invalid id input is given', async () => {
        prismaMock.post.delete.mockResolvedValue(mockPost);

        const res = await request(app)
          .delete('/api/auth/posts/invalid_id_input')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(404);

        expect(res.body).toEqual({
          error: 'Invalid id input',
        });
      });

      it('should gracefully handle a 500 status code database error', async () => {
        prismaMock.post.delete.mockRejectedValue(new Error('database error'));

        const res = await request(app)
          .delete('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(500);

        expect(res.body).toEqual({
          error: 'Failed to delete post',
          details: 'database error',
        });
      });

      it('should return a 403 error if the logged-in user is not authorized to delete the post', async () => {
        prismaMock.post.findUnique.mockResolvedValue({
          ...mockPost,
          userId: 2,
        });

        const res = await request(app)
          .delete('/api/auth/posts/101')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(
          'Unauthorized: You can only modify your own posts'
        );
      });
    });

    describe('DELETE /api/auth/posts/:id/comments/:commentId', () => {
      describe('Successful scenarios', () => {
        it('should successfully delete a comment and return a status 200', async () => {
          prismaMock.comment.findUnique.mockResolvedValue(mockComment);
          prismaMock.comment.delete.mockResolvedValue(mockComment);

          const res = await request(app)
            .delete(
              `/api/auth/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`
            )
            .set('Authorization', `Bearer ${authToken}`);

          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty('data');
          expect(res.body).toEqual({
            message: 'Comment deleted successfully',
            data: {
              id: expect.any(Number),
              content: expect.any(String),
              createdAt: expect.any(String),
              postId: expect.any(Number),
              userId: expect.any(Number),
              user: {
                username: expect.any(String),
              },
            },
          });
        });
      });

      describe('Failure scenarios', () => {
        it('should return an error if comment is not found and return a status 404', async () => {
          prismaMock.comment.delete.mockResolvedValue(null);

          const res = await request(app)
            .delete(
              `/api/auth/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`
            )
            .set('Authorization', `Bearer ${authToken}`);

          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toBe('Comment not found');
        });

        it('should handle database errors gracefully', async () => {
          prismaMock.comment.delete.mockRejectedValue(
            new Error('Database error')
          );

          const res = await request(app)
            .delete(
              `/api/auth/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`
            )
            .set('Authorization', `Bearer ${authToken}`);

          expect(res.statusCode).toBe(500);
          expect(res.body).toHaveProperty('error');
          expect(res.body).toEqual({
            error: 'Failed to delete comment',
            details: 'Database error',
          });
        });

        it('should return a 403 error if the logged-in user is not authorized to delete the comment', async () => {
          prismaMock.comment.findUnique.mockResolvedValue({
            ...mockComment,
            userId: 2,
          });

          const res = await request(app)
            .delete('/api/auth/posts/101/comments/301')
            .set('Authorization', `Bearer ${authToken}`);

          expect(res.statusCode).toBe(403);
          expect(res.body).toHaveProperty('error');
          expect(res.body.error).toBe(
            'Unauthorized: You can only modify your own comment'
          );
        });
      });
    });
  });
});
