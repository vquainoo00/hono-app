import { Hono } from 'hono';
import type { Env, AppContext } from '../types';
import { getPrismaClient } from '../prismaClient';
import BookingsController from '../controllers/bookings';

type HotelContext = AppContext & {
  bookingsController: BookingsController;
};

export const bookingsRoutes = new Hono<{ Bindings: Env; Variables: HotelContext }>();

// Middleware to initialize Prisma client and HotelsController
bookingsRoutes.use('*', async (c, next) => {
  const prisma = getPrismaClient(c.env);
  const bookingsController = new BookingsController(prisma);
  
  c.set('bookingsController', bookingsController);
  
  await next();
});

bookingsRoutes.get('/', async (c) => {
  const bookingsController = c.get('bookingsController'); 
  return bookingsController.getBookings(c);
});

bookingsRoutes.post('/', async (c) => {
  const bookingsController = c.get('bookingsController');
  return bookingsController.createBooking(c);
});