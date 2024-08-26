import { Hono } from 'hono';
import { getPrismaClient } from '../prismaClient';
import { getAllRooms, createRoom } from '../services/rooms';
import { RoomSchema } from '../schemas/rooms';
import type { Env, AppContext } from '../types';
import { createResponse } from '../utils/responses';



export const roomRoutes = new Hono<{ Bindings: Env; Variables: AppContext }>();

// Fetch all hotels
roomRoutes.get('/', async (c) => {
  const prisma = getPrismaClient(c.env);
  const rooms = await getAllRooms(prisma);
  return c.json(
    createResponse(
        201, 
        'Rooms retieved successfully', 
        rooms
    ), 
    201
);
});

// Create a new hotel
roomRoutes.post('/', async (c) => {

  const prisma = getPrismaClient(c.env);
  const body = await c.req.json();
  const parsed = RoomSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: parsed.error.errors.map(e => e.message).join(', ') }, 400);
  }

  const { name, floor } = parsed.data;  
  const hotelId = await createRoom(prisma, name, floor);
  return c.json({ id: hotelId });
});
