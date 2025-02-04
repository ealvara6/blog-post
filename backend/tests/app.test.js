const request = require('supertest');
const app = require('../src/app');

describe('Health Check Endpoint', () => {
  it('should return the health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'Backend is running!');
  });
});
