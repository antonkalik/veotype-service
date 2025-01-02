export declare global {
  type Response = Express.Response;
  type UserSession = UserSession;
  type ServiceResponse<T> = ServiceResponse<T>;

  namespace NodeJS {
    namespace env {
      interface ProcessEnv extends IProcessEnv {}
    }
  }

  namespace Express {
    interface Request {
      user: UserSession;
    }

    interface Response {
      sendError: ({ error, status }: { error: string; status?: number }) => Express.Response;
      sendData: <T>({ data, status }: { data: T; status?: number }) => Express.Response;
    }
  }
}

interface IProcessEnv {
  JWT_SECRET: string;
  NODE_ENV: 'development' | 'production';
  PORT: number;
}