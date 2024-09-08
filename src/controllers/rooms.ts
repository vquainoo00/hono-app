import RoomsServices from '../services/rooms';
import type { Request } from '../types';
import { RoomSchema, RoomCategoriesSchema } from '../schemas/rooms';
import { createResponse, handleServiceError, handleValidationError } from '../utils/responses';


export default class RoomsController {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async creatRoom(request: Request) {
    const result = RoomSchema.safeParse(await request.req.json());
    if (!result.success) {
      return handleValidationError(result.error, request);
    }

    const roomService = new RoomsServices(this.prisma);
    try {
      const room = await roomService.createRoom(result.data);
      return request.json(createResponse(201, 'Room created successfully', room), 201);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

  async getRooms(request: Request) {
    const cursor = request.req.query('cursor') || null;
    const itemsPerPage = parseInt(request.req.query('perPage') || '5', 10);
    const roomService = new RoomsServices(this.prisma);

    try {
      const { data, metadata } = await roomService.getAllRooms(cursor, itemsPerPage);
      return request.json(createResponse(200, 'Rooms retrieved successfully', data, metadata), 200);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

  async createRoomCategory(request: Request) {
    const result = RoomCategoriesSchema.safeParse(await request.req.json());
    if (!result.success) {
      return handleValidationError(result.error, request);
    }
    const {hotelId, name, price, currency} = result.data;

    const roomService = new RoomsServices(this.prisma);
    try {
      const room = await roomService.createRoomCategory(name, hotelId, price, currency);
      return request.json(createResponse(201, 'Room category created successfully', room), 201);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

  async getRoomCategories(request: Request) {
    const roomService = new RoomsServices(this.prisma);
    const hotelId = request.req.query("hotelId")

    try {
      const data = await roomService.getAllRoomCategories(hotelId);
      return request.json(createResponse(200, 'RoomCategories retrieved successfully', data, {}), 200);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }
}
