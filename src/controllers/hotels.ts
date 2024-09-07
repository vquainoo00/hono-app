import HotelService from '../services/hotels';
import { HotelSchema, UpdateHotelSchema } from '../schemas/hotels';
import type { Request } from '../types';
import { createResponse, errorResponse, handleServiceError, handleValidationError } from '../utils/responses';


export default class HotelsController {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async createHotel(request: Request) {
    const result = HotelSchema.safeParse(await request.req.json());
    if (!result.success) {
      return handleValidationError(result.error, request);
    }

    const hotelService = new HotelService(this.prisma);
    try {
      const hotel = await hotelService.createHotel(result.data);
      return request.json(createResponse(201, 'Hotel created successfully', hotel), 201);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

  async getHotels(request: Request) {
    
    const cursor = request.req.query('cursor') || null;
    const itemsPerPage = parseInt(request.req.query('perPage') || '5', 10);
    const hotelService = new HotelService(this.prisma);

    try {
      const { data, metadata } = await hotelService.getAllHotels(cursor, itemsPerPage);
      return request.json(createResponse(200, 'Hotels retrieved successfully', data, metadata), 200);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

  async getHotelById(request: Request, env: any) {
    try {
      const hotelId = request.req.param('hotelId');
  
      // Check cache first
      const cachedHotel = await env.hms.get(hotelId, "json");
      if (cachedHotel) {
        return request.json(createResponse(200, 'Hotel retrieved successfully', cachedHotel));  // Return proper JSON response
      }
    
      // If not found in cache, retrieve from DB
      const hotelService = new HotelService(this.prisma);
      const hotel = await hotelService.getHotelById(hotelId);
  
      // Cache the retrieved hotel
      await env.hms.put(hotelId, JSON.stringify(hotel));
  
      return request.json(createResponse(200, 'Hotel retrieved successfully', hotel));  // Return proper JSON response
      
    } catch (error) {
      console.error("Error retrieving hotel: ", error);
      return handleServiceError(error, request);
    }
  }
  
  

  async updateHotel(request: Request) {
    const body = await request.req.json();
    const result = UpdateHotelSchema.safeParse(body);
    const hotelId = request.req.param("hotelId");

    if (!result.success) {
      return handleValidationError(result.error, request);
    }

    const {...updateData } = result.data;
    const hotelService = new HotelService(this.prisma);

    try {
      const hotel = await hotelService.updateHotel(hotelId, updateData);
      return request.json(createResponse(200, 'Hotel updated successfully', hotel), 200);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }
}
