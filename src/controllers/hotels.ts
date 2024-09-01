import HotelService from '../services/hotels';
import { HotelSchema, UpdateHotelSchema } from '../schemas/hotels';
import { createResponse, errorResponse, handleServiceError, handleValidationError } from '../utils/responses';

interface HotelRequest {
  body: any;
  req: {
    query: (name: string) => string | any;
    param: (name: string) => string | any;
    json: () => Promise<any>;
  };
  json: (response: object, status?: number) => Response;
}

export default class HotelsController {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async createHotel(request: HotelRequest) {
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

  async getHotels(request: HotelRequest) {
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

  async getHotelById(request: HotelRequest) {
    const hotelId = request.req.param('hotelId');
    if (!hotelId) {
      return request.json(errorResponse(400, 'Hotel ID is required'), 400);
    }

    const hotelService = new HotelService(this.prisma);
    try {
      const hotel = await hotelService.getHotelById(hotelId);
      return request.json(createResponse(200, 'Hotel retrieved successfully', hotel), 200);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

  async updateHotel(request: HotelRequest) {
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
