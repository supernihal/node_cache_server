import Redis from 'ioredis';

class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis();
  }

  async get(key: string): Promise<object | null> {
    const data = await this.redis.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  async set(key: string, value: object, ttlInSeconds: number): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttlInSeconds);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}

export default new CacheService();
