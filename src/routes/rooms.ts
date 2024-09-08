import { Hono } from 'hono';
import type { Env, AppContext } from '../types';
import { getPrismaClient } from '../prismaClient';
import RoomsController from '../controllers/rooms';

type HotelContext = AppContext & {
  roomController: RoomsController;
};

export const roomRoutes = new Hono<{ Bindings: Env; Variables: HotelContext }>();

// Middleware to initialize Prisma client and HotelsController
roomRoutes.use('*', async (c, next) => {
  const prisma = getPrismaClient(c.env);
  const roomsController = new RoomsController(prisma);
  
  c.set('roomController', roomsController);
  
  await next();
});

roomRoutes.get('/', async (c) => {
  const roomController = c.get('roomController'); 
  return roomController.getRooms(c);
});

roomRoutes.post('/', async (c) => {
  const roomController = c.get('roomController');
  return roomController.creatRoom(c);
});

roomRoutes.get('/categories', async (c) => {
  const roomController = c.get('roomController'); 
  return roomController.getRoomCategories(c);
});

roomRoutes.post('/categories', async (c) => {
  const roomController = c.get('roomController');
  return roomController.createRoomCategory(c);
});
