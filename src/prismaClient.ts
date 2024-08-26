import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import type { Env } from './types';

let prisma: PrismaClient;

export const getPrismaClient = (env: Env): PrismaClient => {
  if (!prisma) {
    const adapter = new PrismaD1(env.DB);
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
};
