import { Hono } from 'hono';
import { getPrismaClient } from '../prismaClient';
import { getAllHotels, createHotel, getHotelById } from '../services/hotels';
import { HotelSchema } from '../schemas/hotels';
import type { Env, AppContext } from '../types';
import { createResponse, errorResponse} from '../utils/responses';



export const hotelRoutes = new Hono<{ Bindings: Env; Variables: AppContext }>();

// Fetch all hotels
hotelRoutes.get('/', async (c) => {
  const prisma = getPrismaClient(c.env);
  const cursor = c.req.query('cursor') || null
  const itemsPerPage = parseInt(c.req.query('perPage') || '5', 10);


  const data  = await getAllHotels(prisma, cursor, itemsPerPage);
  return c.json(
    createResponse(
        201, 
        'Hotels retrieved successfully', 
        data
    ), 
    201
);
});

// Fetch by Id
hotelRoutes.get('/:hotelId', async (c) => {
  const prisma = getPrismaClient(c.env);
  const hotel = await getHotelById(prisma, c.req.param('hotelId'));
  return c.json(
    createResponse(
        201, 
        'Hotel retrieved successfully', 
        hotel
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
      errorResponse(
            400, 
            'Invalid request data', 
            null, 
            parsed.error.issues
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
