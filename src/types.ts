import { PrismaClient } from '@prisma/client';

export interface Env {
  DB: D1Database;
}

export interface AppContext {
  prisma: PrismaClient;
}

