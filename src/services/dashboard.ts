

export default class DashboardService {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async getNumberOfRooms (hotelId: string) {
    try {
      const stat = await this.prisma.rooms.count({
        where: {
          hotelId: hotelId,
        },
      });
      return stat ? stat : 0;
    } catch (error) {
      throw new Error('Failed to fetch stats');
    }
  };

  async getNumberOfRoomCategories (hotelId: string) {
    try {
      const stat = await this.prisma.roomCategories.count({
        where: {
          hotelId: hotelId,
        },
      });
      return stat ? stat : 0;
    } catch (error) {
      throw new Error('Failed to fetch stats');
    }
  };

  async getNumberOfBranches (hotelId: string) {
    try {
      const stat = await this.prisma.branches.count({
        where: {
          hotelId: hotelId,
        },
      });
      return stat ? stat : 0;
    } catch (error) {
      throw new Error('Failed to fetch stats');
    }
  };

}