import express, { Application, Request, Response } from 'express';
import CacheService from './cache';
import bodyParser from 'body-parser';

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for logging requests
app.use((req: Request, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET endpoint to retrieve a cached item
app.get('/cache/:key', async (req: Request, res: Response) => {
  const { key } = req.params;
  const value = await CacheService.get(key);
  if (value) {
    res.json({ key, value });
  } else {
    res.status(404).json({ error: 'Key not found' });
  }
});

// PUT endpoint to add or update a cached item
app.put('/cache/:key', async (req: Request, res: Response) => {
  const { key } = req.params;
  const { value, ttlInSeconds } = req.body;
  await CacheService.set(key, value, ttlInSeconds || 3600); // Default TTL: 1 hour
  res.json({ success: true });
});

// DELETE endpoint to remove a cached item
app.delete('/cache/:key', async (req: Request, res: Response) => {
  const { key } = req.params;
  await CacheService.del(key);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

