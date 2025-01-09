import { ServiceSuccess, ServiceError } from 'src/@types';

export type ServiceResponse<T> = ServiceSuccess<T> | ServiceError;

export class Service {
  public static success<T>(data: T = null as T, status: number = 200): ServiceSuccess<T> {
    return {
      data,
      status,
      success: true,
    };
  }

  public static error(error: string, status: number = 500): ServiceError {
    const isInternal = status === 500;

    if (isInternal) {
      console.error(`[ERROR] ${status}`, { error });
    }

    return {
      error: isInternal ? 'Internal server error' : error,
      status,
      success: false,
    };
  }
}
