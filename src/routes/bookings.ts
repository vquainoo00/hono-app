import { Hono } from 'hono';
import { getPrismaClient } from '../prismaClient';
import type { Env, AppContext } from '../types';
import { createResponse} from '../utils/responses';
import BookingsService from '../services/bookings';



export const bookingsRoutes = new Hono<{ Bindings: Env; Variables: AppContext }>();

// Fetch all bookings with filters
bookingsRoutes.get('/', async (c) => {
  const prisma = getPrismaClient(c.env);
  const queryFilters = c.req.query()
  const cursor = c.req.query('cursor') || null
  const itemsPerPage: number = parseInt(c.req.query('perPage') || '5', 10);

  const bookingsService = new BookingsService(prisma);


  const data = await bookingsService.getBookings(cursor, itemsPerPage, queryFilters);

  return c.json(
    createResponse(
        200, 
        'Bookings retrieved successfully', 
        data,
        []
    ), 
    200
);
});


// Create a new branch
bookingsRoutes.post('/', async (c) => {

  const prisma = getPrismaClient(c.env);
  const body = await c.req.json();
  const bookingsService = new BookingsService(prisma)

  const booking = await bookingsService.createBooking(body);
  return c.json(
    createResponse(
        201, 
        'Booking created successfully', 
        booking,
    ), 
    201
);
});

