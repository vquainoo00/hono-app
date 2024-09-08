import DashboardService from '../services/dashboard';
import type { Request } from '../types';
import { createResponse, handleServiceError } from '../utils/responses';


export default class dashboardController {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }


  async getStats(request: Request) {
    const hotelId = request.req.param("hotelId")
    const dashboardService = new DashboardService(this.prisma);

    try {
      const branches = await dashboardService.getNumberOfBranches(hotelId);
      const roomCategories = await dashboardService.getNumberOfRoomCategories(hotelId);
      const rooms = await dashboardService.getNumberOfRooms(hotelId);

      const data = {
        branches: branches,
        rooms: rooms,
        roomCategories: roomCategories
      }

      return request.json(createResponse(200, 'Stats retrieved', data, {}), 200);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

}
