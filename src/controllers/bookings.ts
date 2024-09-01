import BookingsService from '../services/bookings';
import { createResponse, handleServiceError, handleValidationError} from '../utils/responses';

interface BookingsRequest {
  body: any;
  req: {
    query: (name: string) => string | any;
    param: (name: string) => string | any;
    json: () => Promise<any>;
  };
  json: (response: object, status?: number) => Response;
}

export default class BookingsController {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async createBooking(request: BookingsRequest) {

    const bookingsService = new BookingsService(this.prisma);
    try {
      const room = await bookingsService.createBooking(request.body);
      return request.json(createResponse(201, 'Booking created successfully', room), 201);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

  async getBookings(request: BookingsRequest) {
    const bookingsService = new BookingsService(this.prisma);
    const hotelId = request.req.param('hotelId')

    const cursor = request.req.query('cursor') || null;
    const itemsPerPage = parseInt(request.req.query('perPage') || '5', 10);
    const queryFilters = request.req.query

    try {
      const { data, metadata } = await bookingsService.getBookings(cursor, itemsPerPage, queryFilters);
      return request.json(createResponse(200, 'Branches retrieved successfully', data, metadata), 200);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }
}