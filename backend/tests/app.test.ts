import request from 'supertest';
import app from '../src/app';

describe('Health Check Endpoint', () => {
  it('should return the health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'This is a public health check');
  });
});
