import { PrismaClient } from '@prisma/client';

export interface Env {
  DB: D1Database;
  hms: KVNamespace;
}

export interface AppContext {
  prisma: PrismaClient;
}

export interface Request {
  body: any;
  req: {
    query: (name: string) => string | any;
    param: (name: string) => string | any;
    url?: string;
    method?: string;
    headers?: any;
    json: () => Promise<any>;
  };
  json: (response: object, status?: number) => Response;
}