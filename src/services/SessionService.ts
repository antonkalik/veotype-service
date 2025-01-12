import { RedisService } from 'src/services/RedisService';
import { TTL } from 'src/constants/session';

export class SessionService {
  public static key: string = 'session';
  private static getKey(id: number) {
    return `${this.key}:${id}`;
  }

  public static async set(id: number, token: string, ttl: number = TTL) {
    return RedisService.set(this.getKey(id), token, ttl);
  }

  public static async get(id: number) {
    return RedisService.get(this.getKey(id));
  }

  public static async del(id: number) {
    return RedisService.del(this.getKey(id));
  }
}
