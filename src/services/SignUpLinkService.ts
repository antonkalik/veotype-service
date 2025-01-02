import { RedisService } from 'src/services/RedisService';
import { getRandomString } from 'src/utils/getRandomString';
import { Service, ServiceResponse } from 'src/services/Service';
import { TokenService } from 'src/services/TokenService';

export class SignUpLinkService {
  public static key = 'signup-link';
  private static getKey(id: number) {
    return `${this.key}:${id}`;
  }

  public static async create(): Promise<ServiceResponse<{ token: string }>> {
    const uuid = getRandomString(32);
    const uniqueIdResponse = await RedisService.generateUniqueId(this.key);

    if (!uniqueIdResponse.success) {
      return uniqueIdResponse;
    }

    const id = uniqueIdResponse.data.id;
    const redisServiceResponse = await RedisService.set(this.getKey(id), uuid);

    if (!redisServiceResponse.success) {
      return redisServiceResponse;
    }

    return TokenService.sign({ id, uuid });
  }

  public static async get(id: number) {
    return RedisService.get(this.getKey(id));
  }
}
