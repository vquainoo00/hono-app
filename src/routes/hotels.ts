import { Hono } from 'hono';
import { getPrismaClient } from '../prismaClient';
import { getAllHotels, createHotel, getHotelById, updateHotel } from '../services/hotels';
import { HotelSchema, UpdateHotelSchema} from '../schemas/hotels';
import type { Env, AppContext } from '../types';
import { createResponse, errorResponse} from '../utils/responses';



export const hotelRoutes = new Hono<{ Bindings: Env; Variables: AppContext }>();

// Fetch all hotels
hotelRoutes.get('/', async (c) => {
  const prisma = getPrismaClient(c.env);
  const cursor = c.req.query('cursor') || null
  const itemsPerPage = parseInt(c.req.query('perPage') || '5', 10);


  const data = await getAllHotels(prisma, cursor, itemsPerPage);

  return c.json(
    createResponse(
        200, 
        'Hotels retrieved successfully', 
        data
    ), 
    200
);
});

// Fetch by Id
hotelRoutes.get('/:hotelId', async (c) => {
  const prisma = getPrismaClient(c.env);
  const hotel = await getHotelById(prisma, c.req.param('hotelId'));
  return c.json(
    createResponse(
        200, 
        'Hotel retrieved successfully', 
        hotel
    ), 
    200
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

  const { data } = parsed;  
  const hotel = await createHotel(prisma, data);
  return c.json(
    createResponse(
        201, 
        'Hotel created successfully', 
        hotel,
    ), 
    201
);
});


// Updates an existing hotel
hotelRoutes.patch('/', async (c) => {

  const prisma = getPrismaClient(c.env);
  const body = await c.req.json();
  const parsed = UpdateHotelSchema.safeParse(body);

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

  const hotelId = parsed.data.hotelId;  
  const hotel = await updateHotel(prisma, hotelId, parsed.data);
  return c.json(
    createResponse(
        201, 
        'Hotel updated successfully', 
        hotel,
    ), 
    201
);
});
