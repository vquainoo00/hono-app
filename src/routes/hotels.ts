import { Hono } from 'hono';
import type { Env, AppContext } from '../types';
import { getPrismaClient } from '../prismaClient';
import HotelsController from '../controllers/hotels';

// Define a new type for the context variables
type HotelContext = AppContext & {
  hotelController: HotelsController;
};

export const hotelRoutes = new Hono<{ Bindings: Env; Variables: HotelContext }>();

// Middleware to initialize Prisma client and HotelsController
hotelRoutes.use('*', async (c, next) => {
  const prisma = getPrismaClient(c.env);
  const hotelController = new HotelsController(prisma);
  
  // Set the hotelController in the context
  c.set('hotelController', hotelController);
  
  await next();
});

// Route to get all hotels
hotelRoutes.get('/', async (c) => {
  const hotelController = c.get('hotelController'); // Type inference works due to our explicit type definition
  return hotelController.getHotels(c);
});

// Route to get hotel by ID
hotelRoutes.get('/:hotelId', async (c) => {
  const hotelController = c.get('hotelController');
  return hotelController.getHotelById(c);
});

// Route to create a new hotel
hotelRoutes.post('/', async (c) => {
  const hotelController = c.get('hotelController');
  return hotelController.createHotel(c);
});

// Route to update a hotel
hotelRoutes.patch('/:hotelId', async (c) => {
  const hotelController = c.get('hotelController');
  return hotelController.updateHotel(c);
});
