import { Hono } from 'hono';
import { getPrismaClient } from '../prismaClient';
import { getAllRooms, createRoom, createRoomCategory, getAllRoomCategories } from '../services/rooms';
import { RoomCategoriesSchema, RoomSchema } from '../schemas/rooms';
import type { Env, AppContext } from '../types';
import { createResponse } from '../utils/responses';




export const roomRoutes = new Hono<{ Bindings: Env; Variables: AppContext }>();

// Fetch all rooms
roomRoutes.get('/', async (c) => {
  const prisma = getPrismaClient(c.env);
  const cursor = c.req.query('cursor') || null
  const itemsPerPage = parseInt(c.req.query('perPage') || '5', 10);


  const data = await getAllRooms(prisma, cursor, itemsPerPage);

  return c.json(
    createResponse(
        200, 
        'Rooms retrieved successfully', 
        data
    ), 
    200
);
});

// Create a new ROOM
roomRoutes.post('/', async (c) => {

  const prisma = getPrismaClient(c.env);
  const body = await c.req.json();
  const parsed = RoomSchema.safeParse(body);
  

  if (!parsed.success) {
    return c.json({ error: parsed.error.errors.map(e => e.message).join(', ') }, 400);
  }

  const {data} = parsed;  
  const room = await createRoom(prisma, data);
  return c.json(room);
});


// Get Room categories
roomRoutes.get('/categories/:hotelId', async (c) => {
  const prisma = getPrismaClient(c.env);
  const hotelId = c.req.param('hotelId')
  const rooms = await getAllRoomCategories(prisma, hotelId);
  return c.json(
    createResponse(
        200, 
        'Room categories retieved successfully', 
        rooms
    ), 
    200
);
});


// Create a room category
roomRoutes.post('/categories', async (c) => {

  const prisma = getPrismaClient(c.env);
  const body = await c.req.json();
  const parsed = RoomCategoriesSchema.safeParse(body);
  

  if (!parsed.success) {
    return c.json({ error: parsed.error.errors.map(e => e.message).join(', ') }, 400);
  }

  const { name, hotelId } = parsed.data;  
  const roomCategory = await createRoomCategory(prisma, name, hotelId);
  return c.json(
    createResponse(
        201, 
        'Room categories created successfully', 
        roomCategory
    ), 
    201
);
});