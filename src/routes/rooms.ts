import { Hono } from 'hono';
import { getPrismaClient } from '../prismaClient';
import RoomService from '../services/rooms';
import { RoomCategoriesSchema, RoomSchema } from '../schemas/rooms';
import type { Env, AppContext } from '../types';
import { createResponse } from '../utils/responses';




export const roomRoutes = new Hono<{ Bindings: Env; Variables: AppContext }>();

// Fetch all rooms
roomRoutes.get('/', async (c) => {
  const prisma = getPrismaClient(c.env);
  const cursor = c.req.query('cursor') || null
  const itemsPerPage = parseInt(c.req.query('perPage') || '5', 10);

  const roomService = new RoomService(prisma);



  const data = await roomService.getAllRooms(cursor, itemsPerPage);

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
  const roomService = new RoomService(prisma);

  const room = await roomService.createRoom(data);
  return c.json(room);
});


// Get Room categories
roomRoutes.get('/categories/:hotelId', async (c) => {
  const prisma = getPrismaClient(c.env);
  const hotelId = c.req.param('hotelId')

  const roomService = new RoomService(prisma);

  const rooms = await roomService.getAllRoomCategories(hotelId);
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
  
  const roomService = new RoomService(prisma);


  if (!parsed.success) {
    return c.json({ error: parsed.error.errors.map(e => e.message).join(', ') }, 400);
  }

  const { name, hotelId } = parsed.data;  
  const roomCategory = await roomService.createRoomCategory(name, hotelId);
  return c.json(
    createResponse(
        201, 
        'Room categories created successfully', 
        roomCategory
    ), 
    201
);
});