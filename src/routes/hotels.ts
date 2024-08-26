import { Hono } from 'hono';
import { getPrismaClient } from '../prismaClient';
import { getAllHotels, createHotel } from '../services/hotels';
import { HotelSchema } from '../schemas/hotels';
import type { Env, AppContext } from '../types';
import { createResponse } from '../utils/responses';



export const hotelRoutes = new Hono<{ Bindings: Env; Variables: AppContext }>();

// Fetch all hotels
hotelRoutes.get('/', async (c) => {
  const prisma = getPrismaClient(c.env);
  const hotels = await getAllHotels(prisma);
  return c.json(
    createResponse(
        201, 
        'Hotels retrieved successfully', 
        hotels
    ), 
    201
);
});

// Create a new hotel
hotelRoutes.post('/', async (c) => {

  const prisma = getPrismaClient(c.env);
  const body = await c.req.json();
  const parsed = HotelSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
        createResponse(
            400, 
            'Invalid request data', 
            null, 
            parsed.error.errors.map(e => e.message)
        ), 
        400
    );
}

  const { name, location, shortName } = parsed.data;  
  const hotelId = await createHotel(prisma, name, location, shortName);
  return c.json(
    createResponse(
        201, 
        'Hotel created successfully', 
        { id: hotelId }
    ), 
    201
);
});
