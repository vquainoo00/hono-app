import BookingsService from '../services/bookings';
import type { Request } from '../types';
import { createResponse, handleServiceError} from '../utils/responses';

export default class BookingsController {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async createBooking(request: Request) {

    const bookingsService = new BookingsService(this.prisma);
    try {
      const room = await bookingsService.createBooking(request.body);
      return request.json(createResponse(201, 'Booking created successfully', room), 201);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

  async getBookings(request: Request) {
    const bookingsService = new BookingsService(this.prisma);

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