import { Hono } from 'hono';
import { getPrismaClient } from '../prismaClient';
import { HotelSchema, UpdateHotelSchema} from '../schemas/hotels';
import type { Env, AppContext } from '../types';
import { createResponse, errorResponse} from '../utils/responses';
import HotelService from '../services/hotels';



export const hotelRoutes = new Hono<{ Bindings: Env; Variables: AppContext }>();

// Fetch all hotels
hotelRoutes.get('/', async (c) => {
  const prisma = getPrismaClient(c.env);
  const cursor = c.req.query('cursor') || null
  const itemsPerPage: number = parseInt(c.req.query('perPage') || '5', 10);

  const hotelService = new HotelService(prisma);


  const {data, metadata} = await hotelService.getAllHotels(cursor, itemsPerPage);
  return c.json(
    createResponse(
        200, 
        'Hotels retrieved successfully', 
        data,
        metadata
    ), 
    200
);
});

// Fetch by Id
hotelRoutes.get('/:hotelId', async (c) => {
  const prisma = getPrismaClient(c.env);
  const hotelService = new HotelService(prisma);
  const hotel = await hotelService.getHotelById(c.req.param('hotelId'));
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

  const hotelService = new HotelService(prisma);

  const hotel = await hotelService.createHotel(data);
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
  const hotelService = new HotelService(prisma);

  const hotel = await hotelService.updateHotel(hotelId, parsed.data);
  return c.json(
    createResponse(
        201, 
        'Hotel updated successfully', 
        hotel,
    ), 
    201
);
});
