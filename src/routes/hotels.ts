import { Hono } from 'hono';
import type { Env, AppContext } from '../types';
import { getPrismaClient } from '../prismaClient';
import HotelsController from '../controllers/hotels';

type HotelContext = AppContext & {
  hotelController: HotelsController;
};

export const hotelRoutes = new Hono<{ Bindings: Env; Variables: HotelContext }>();

// Middleware to initialize Prisma client and HotelsController
hotelRoutes.use('*', async (c, next) => {
  const prisma = getPrismaClient(c.env);
  const hotelController = new HotelsController(prisma);
  
  c.set('hotelController', hotelController);
  
  await next();
});

hotelRoutes.get('/', async (c) => {
  const hotelController = c.get('hotelController'); 
  return hotelController.getHotels(c);
});

hotelRoutes.get('/:hotelId', async (c) => {
  const hotelController = c.get('hotelController');
  return hotelController.getHotelById(c);
});

hotelRoutes.post('/', async (c) => {
  const hotelController = c.get('hotelController');
  return hotelController.createHotel(c);
});

hotelRoutes.patch('/:hotelId', async (c) => {
  const hotelController = c.get('hotelController');
  return hotelController.updateHotel(c);
});
