import request from 'supertest';
import express from 'express';
import CacheService from './cache';

const app = express();
app.use(express.json());

// Define the routes and middleware (same as in index.ts)
app.get('/cache/:key', async (req, res) => {
  const { key } = req.params;
  const value = await CacheService.get(key);
  if (value) {
    res.json({ key, value });
  } else {
    res.status(404).json({ error: 'Key not found' });
  }
});

app.put('/cache/:key', async (req, res) => {
  const { key } = req.params;
  const { value, ttlInSeconds } = req.body;
  await CacheService.set(key, value, ttlInSeconds || 3600);
  res.json({ success: true });
});

app.delete('/cache/:key', async (req, res) => {
  const { key } = req.params;
  await CacheService.del(key);
  res.json({ success: true });
});

// Export the app for testing
export default app;

describe('Cache API Endpoints', () => {
  beforeEach(async() => {
    await CacheService.set('testKey', {"propA": "valueA", "propB": "valueB"}, 3600);
  });

  it('should get a cached item', async () => {
    // Assume you've set up a test cache item with key 'testKey' and value {"propA": "valueA", "propB": "valueB"}
    const response = await request(app).get('/cache/testKey');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ key: 'testKey', value: {"propA": "valueA", "propB": "valueB"} });
  });

  it('should return 404 when getting a non-existent item', async () => {
    const response = await request(app).get('/cache/nonExistentKey');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Key not found' });
  });

  it('should put a new item into the cache', async () => {
    const response = await request(app)
      .put('/cache/newKey')
      .send({ value: 'newValue', ttlInSeconds: 60 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });

  it('should delete an item from the cache', async () => {
    const response = await request(app).delete('/cache/testKey');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });

  it('should return 200 when deleting a non-existent item', async () => {
    const response = await request(app).delete('/cache/nonExistentKey');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });
});
