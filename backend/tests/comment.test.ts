import request from 'supertest';
import { Express } from 'express';
import createTestServer from '../src/config/testServer';
import { mockComment } from './__mocks__/commentMocks';

jest.mock('@prisma/client', () => {
  const PrismaClient = jest.fn().mockImplementation(() => ({
    comment: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }));

  return { PrismaClient };
});

const TEST_POST_ID = 101;
const TEST_COMMENT_ID = 201;
const INVALID_POST_ID = 'Invalid_post_id';
const INVALID_COMMENT_ID = 'Invalid_comment_id';
const UPDATED_MOCK_CONTENT = 'updated_mock_content';

const prismaMock = require('@prisma/client').PrismaClient();

describe('Comment Routes', () => {
  let app: Express;

  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });
  describe(`GET /api/posts/:id/comments`, () => {
    describe('Successful scenarios', () => {
      it('should return a list of comments with status 200', async () => {
        prismaMock.comment.findMany.mockResolvedValue([mockComment]);

        const res = await request(app).get(
          `/api/posts/${TEST_POST_ID}/comments`
        );
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toEqual({
          id: expect.any(Number),
          postId: expect.any(Number),
          content: expect.any(String),
          userId: expect.any(Number),
          createdAt: expect.any(String),
          user: {
            username: expect.any(String),
          },
        });
      });

      it('should return an empty array of comments with status 200', async () => {
        prismaMock.comment.findMany.mockResolvedValue([]);

        const res = await request(app).get(
          `/api/posts/${TEST_POST_ID}/comments`
        );

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toEqual(0);
      });
    });

    describe('Failure scenarios', () => {
      it('Should handle database errors gracefully', async () => {
        prismaMock.comment.findMany.mockRejectedValue(
          new Error('Database error')
        );

        const res = await request(app).get(
          `/api/posts/${TEST_POST_ID}/comments`
        );

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toEqual({
          error: 'Failed to fetch comments',
          details: 'Database error',
        });
      });
    });

    describe('Validation scenarios', () => {
      it('should return an error message if an invalid post id is given and return a status 404', async () => {
        const res = await request(app).get(
          `/api/posts/${INVALID_POST_ID}/comments`
        );

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('Invalid id input');
      });
    });
  });

  describe('GET /api/posts/:id/comments/:commentID', () => {
    describe('Successful scenarios', () => {
      it('should return one comment with a status 200', async () => {
        prismaMock.comment.findUnique.mockResolvedValue(mockComment);

        const res = await request(app).get(
          `/api/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`
        );

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual({
          id: expect.any(Number),
          postId: expect.any(Number),
          content: expect.any(String),
          userId: expect.any(Number),
          createdAt: expect.any(String),
          user: {
            username: expect.any(String),
          },
        });
      });
    });

    describe('Failure scenarios', () => {
      it('Should give an error message when no comment is found and return a 404', async () => {
        prismaMock.comment.findUnique.mockResolvedValue(null);

        const res = await request(app).get(
          `/api/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`
        );

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('Comment not found');
      });

      it('Should handle database errors gracefully', async () => {
        prismaMock.comment.findUnique.mockRejectedValue(
          new Error('Database error')
        );

        const res = await request(app).get(
          `/api/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`
        );

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toEqual({
          error: 'Failed to fetch comment',
          details: 'Database error',
        });
      });
    });

    describe('Validation scenarios', () => {
      it('Should return an error message if an invalid comment id is given and return a status 404', async () => {
        const res = await request(app).get(
          `/api/posts/${TEST_POST_ID}/comments/${INVALID_COMMENT_ID}`
        );

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('Invalid id input');
      });
    });
  });

  describe('POST /api/posts/:id/comments', () => {
    describe('Successful scenarios', () => {
      it('Should create a new comment with a status 201', async () => {
        prismaMock.comment.create.mockResolvedValue(mockComment);

        const res = await request(app)
          .post(`/api/posts/${TEST_POST_ID}/comments`)
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
          .post(`/api/posts/${TEST_POST_ID}/comments`)
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
          .post(`/api/posts/${TEST_POST_ID}/comments`)
          .send({ content: '' });

        console.log(res.body);

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
          .post(`/api/posts/${TEST_POST_ID}/comments`)
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

  describe('PUT /api/posts/:id/comments/:commentId', () => {
    describe('Successful scenarios', () => {
      it('should successfully update a comment and return status 200', async () => {
        prismaMock.comment.update.mockResolvedValue({
          ...mockComment,
          content: UPDATED_MOCK_CONTENT,
        });

        const res = await request(app)
          .put(`/api/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`)
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
          .put(`/api/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`)
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
          .put(`/api/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`)
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
          .put(`/api/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`)
          .send({ content: UPDATED_MOCK_CONTENT });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Comment not found');
      });
    });
  });

  describe('DELETE /api/posts/:id/comments/:commentId', () => {
    describe('Successful scenarios', () => {
      it('should successfully delete a comment and return a status 200', async () => {
        prismaMock.comment.delete.mockResolvedValue(mockComment);

        const res = await request(app).delete(
          `/api/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`
        );

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

        const res = await request(app).delete(
          `/api/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`
        );

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Comment not found');
      });

      it('should handle database errors gracefully', async () => {
        prismaMock.comment.delete.mockRejectedValue(
          new Error('Database error')
        );

        const res = await request(app).delete(
          `/api/posts/${TEST_POST_ID}/comments/${TEST_COMMENT_ID}`
        );

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toEqual({
          error: 'Failed to delete comment',
          details: 'Database error',
        });
      });
    });
  });
});
