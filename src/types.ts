import { PrismaClient } from '@prisma/client';

export interface Env {
  DB: D1Database;
}

export interface AppContext {
  prisma: PrismaClient;
}

export interface Request {
  body: any;
  req: {
    query: (name: string) => string | any;
    param: (name: string) => string | any;
    json: () => Promise<any>;
  };
  json: (response: object, status?: number) => Response;
}