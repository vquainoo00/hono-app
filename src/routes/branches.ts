import { Hono } from 'hono';

import type { Env, AppContext } from '../types';
import { getPrismaClient } from '../prismaClient';
import BranchesController from '../controllers/branches';

type HotelContext = AppContext & {
  branchesController: BranchesController;
};

export const branchesRoutes = new Hono<{ Bindings: Env; Variables: HotelContext }>();

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
