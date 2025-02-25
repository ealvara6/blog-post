import request from 'supertest';
import { Express } from 'express';
import createTestServer from '../src/config/testServer';

jest.mock('@prisma/client', () => {
  const PrismaClient = jest.fn().mockImplementation(() => ({
    post: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }));

  return { PrismaClient };
});

const mockPost = {
  id: 101,
  title: 'mock_post_title',
  content: 'mock_post_content',
  published: true,
  userId: 1,
  createdAt: new Date(),
  comments: [
    {
      id: 201,
      content: 'mock_comment_content',
      createdAt: new Date(),
      postId: 101,
      userId: 1,
    },
  ],
};

const prismaMock = require('@prisma/client').PrismaClient();

describe('GET /api/posts', () => {
  let app: Express;
  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });

  it('should return a list of posts with status 200', async () => {
    prismaMock.post.findMany.mockResolvedValue([mockPost]);

    const res = await request(app).get('/api/posts');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('posts');
    expect(Array.isArray(res.body.posts)).toBe(true);

    expect(res.body.posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          published: expect.any(Boolean),
          userId: expect.any(Number),
          createdAt: expect.any(String),
          comments: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              content: expect.any(String),
              createdAt: expect.any(String),
              postId: expect.any(Number),
              userId: expect.any(Number),
            }),
          ]),
        }),
      ])
    );

    expect(res.body.posts.length).toBeGreaterThan(0);
  });

  it('should return an empty list when no posts exist', async () => {
    prismaMock.post.findMany.mockResolvedValue([]);

    const res = await request(app).get('/api/posts');

    expect(res.statusCode).toBe(200);
    expect(res.body.posts).toEqual([]);
    expect(res.body.posts.length).toBe(0);
  });

  it('should handle database errors gracefully', async () => {
    prismaMock.post.findMany.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/posts');

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      error: 'Failed to fetch posts',
      details: 'Database error',
    });
  });
});

describe('GET /api/posts/:id', () => {
  let app: Express;
  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });

  it('should return one post object based on its id', async () => {
    prismaMock.post.findUnique.mockResolvedValue(mockPost);

    const res = await request(app).get('/api/posts/101');

    expect(res.statusCode).toBe(200);

    expect(res.body.post).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        published: expect.any(Boolean),
        userId: expect.any(Number),
        createdAt: expect.any(String),
        comments: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            content: expect.any(String),
            createdAt: expect.any(String),
            postId: expect.any(Number),
            userId: expect.any(Number),
          }),
        ]),
      })
    );
  });

  it('should return a 404 when no post is found and give an error message', async () => {
    prismaMock.post.findUnique.mockResolvedValue(null);

    const res = await request(app).get('/api/posts/201');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: 'Post not found',
    });
  });

  it('should return a 404 status code if given an invalid id input', async () => {
    const res = await request(app).get('/api/posts/invalid-input-id');

    expect(res.statusCode).toBe(404);

    expect(res.body).toEqual({
      error: 'Invalid id input',
    });
  });

  it('should handle database errors gracefully', async () => {
    prismaMock.post.findUnique.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/posts/101');

    expect(res.statusCode).toBe(500);

    expect(res.body).toEqual({
      error: 'Failed to fetch post',
      details: 'Database error',
    });
  });
});

describe('POST /api/posts', () => {
  let app: Express;
  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });

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

    const res = await request(app).post('/api/posts').send(newPost);

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

    const res = await request(app).post('/api/posts').send(newPost);

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

    const res = await request(app).post('/api/posts').send(newPost);

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
      .post('/api/posts')
      .send({ title: 'mock_post_title' });

    expect(res.statusCode).toBe(500);

    expect(res.body).toEqual({
      error: 'Failed to create new post',
      details: 'database error',
    });
  });
});

describe('PUT /api/posts/:id', () => {
  let app: Express;
  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });

  it('Should successfully update a post', async () => {
    prismaMock.post.update.mockResolvedValue({
      ...mockPost,
      title: 'Updated title',
    });

    const res = await request(app)
      .put('/api/posts/101')
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
      .put('/api/posts/101')
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toBe(200);

    expect(res.body.data.title).toBe('Updated Title');
    expect(res.body.data.content).toBe(mockPost.content);
  });

  it('Should validate title length', async () => {
    const res = await request(app)
      .put('/api/posts/101')
      .send({ title: 'a'.repeat(100) });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe(
      'Title must be less than 50 characters long'
    );
  });

  it('Should return 400 if no update data is provided', async () => {
    const res = await request(app).put('/api/posts/101').send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: 'Request body cannot be empty',
      message: 'Please provide data to update',
    });
  });

  it('Should return a 400 status code if the data is invalid', async () => {
    prismaMock.post.update.mockResolvedValue({ ...mockPost, title: '' });

    const res = await request(app).put('/api/posts/101').send({ title: '' });

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
      .put('/api/posts/invalid-id-input')
      .send(mockPost);

    expect(res.statusCode).toBe(404);
  });

  it('Should return a 404 status code if a post is not found', async () => {
    prismaMock.post.update.mockResolvedValue(null);

    const res = await request(app)
      .put('/api/posts/101')
      .send({ title: 'Mock title' });

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: 'Post not found',
    });
  });

  it('Should handle database errors gracefully', async () => {
    prismaMock.post.update.mockRejectedValue(new Error('Database error'));

    const res = await request(app)
      .put('/api/posts/101')
      .send({ title: 'Updated title ' });

    expect(res.statusCode).toBe(500);

    expect(res.body).toEqual({
      error: 'Failed to update post',
      details: 'Database error',
    });
  });
});

describe('DELETE /api/posts/:id', () => {
  let app: Express;
  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestServer(prismaMock);
  });

  it("should successfully delete a user's post", async () => {
    prismaMock.post.delete.mockResolvedValue(mockPost);

    const res = await request(app).delete('/api/posts/101');

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

    const res = await request(app).delete('/api/posts/101');

    expect(res.statusCode).toBe(404);

    expect(res.body).toEqual({
      error: 'Post not found',
    });
  });

  it('Should return a 404 error when an invalid id input is given', async () => {
    prismaMock.post.delete.mockResolvedValue(mockPost);

    const res = await request(app).delete('/api/posts/invalid_id_input');

    expect(res.statusCode).toBe(404);

    expect(res.body).toEqual({
      error: 'Invalid id input',
    });
  });

  it('should gracefully handle a 500 status code database error', async () => {
    prismaMock.post.delete.mockRejectedValue(new Error('database error'));

    const res = await request(app).delete('/api/posts/101');

    expect(res.statusCode).toBe(500);

    expect(res.body).toEqual({
      error: 'Failed to delete post',
      details: 'database error',
    });
  });
});
