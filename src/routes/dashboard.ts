import { Hono } from 'hono';
import type { Env, AppContext } from '../types';
import { getPrismaClient } from '../prismaClient';
import DashboardController from '../controllers/dashboard';

type HotelContext = AppContext & {
  dashboardController: DashboardController;
};

export const dashboardRoutes = new Hono<{ Bindings: Env; Variables: HotelContext }>();

// Middleware to initialize Prisma client and HotelsController
dashboardRoutes.use('*', async (c, next) => {
  const prisma = getPrismaClient(c.env);
  const dashboardController = new DashboardController(prisma);
  
  c.set('dashboardController', dashboardController);
  
  await next();
});

dashboardRoutes.get('/stats/hotels/:hotelId', async (c) => {
  const dashboardController = c.get('dashboardController'); 
  return dashboardController.getStats(c);
});