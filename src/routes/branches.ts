import { Hono } from 'hono';
import { cors } from 'hono/cors';

import type { Env, AppContext } from '../types';
import { getPrismaClient } from '../prismaClient';
import BranchesController from '../controllers/branches';

type HotelContext = AppContext & {
  branchesController: BranchesController;
};

export const branchesRoutes = new Hono<{ Bindings: Env; Variables: HotelContext }>();

// Middleware to initialize Prisma client and HotelsController
branchesRoutes.use('*', cors())
branchesRoutes.use(
  '*',
  cors({
    origin: '*',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
)
branchesRoutes.use('*', async (c, next) => {
  const prisma = getPrismaClient(c.env);
  const roomsController = new BranchesController(prisma);
  
  c.set('branchesController', roomsController);
  
  await next();
});

branchesRoutes.get('/', async (c) => {
  const branchesController = c.get('branchesController'); 
  return branchesController.getBranches(c);
});

branchesRoutes.post('/', async (c) => {
  const branchesController = c.get('branchesController');
  return branchesController.createBranch(c);
});
