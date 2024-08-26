import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export interface Env {
  DB: D1Database;
}

export interface AppContext {
  prisma: PrismaClient;
}
