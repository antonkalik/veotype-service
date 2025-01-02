import * as redis from 'redis';
import { RedisClientType } from 'redis';
import * as dotenv from 'dotenv';
import process from 'process';
import { Service, ServiceResponse } from 'src/services/Service';

dotenv.config();

export class RedisService {
  private static client: RedisClientType;
  private static ttl: number = 60 * 60 * 24 * 7;

  public static async initialize() {
    if (!this.client) {
      try {
        this.client = redis.createClient({
          url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        });

        this.client.on('error', error => console.error('Redis Client Error', error));

        await this.client.connect();

        console.log('Connected to Redis');
      } catch (error) {
        console.error(`Could not connect to Redis: ${error}`);
        process.exit(1);
      }
    }
  }

  public static async generateUniqueId(key: string): Promise<
    ServiceResponse<{
      id: number;
    }>
  > {
    if (!key) {
      return Service.error('key is required', 400);
    }

    try {
      const id = await this.client.incr(key + ':id');
      return Service.success({
        id,
      });
    } catch (error) {
      return Service.error(error.message, 500);
    }
  }

  public static async set(
    key: string,
    token: string,
    ttl?: number
  ): Promise<ServiceResponse<null>> {
    if (!key) return Service.error('key is required', 400);
    if (!token) return Service.error('token is required', 400);

    try {
      await this.client.set(key, token, {
        EX: ttl || this.ttl,
      });

      return Service.success();
    } catch (error) {
      return Service.error(error.message, 500);
    }
  }

  public static async get(key: string): Promise<ServiceResponse<string>> {
    if (!key) return Service.error('key is required', 400);

    const data = await this.client.get(key);

    if (!data) {
      return Service.error('Could not find key', 404);
    }

    return Service.success(data);
  }

  public static async del(key: string) {
    if (!key) return Service.error('key is required', 400);

    try {
      const data = await this.client.del(key);
      return Service.success(data);
    } catch (error) {
      return Service.error(error.message, 500);
    }
  }
}
