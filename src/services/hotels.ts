import { paginate } from '../utils/pagination';
import { v4 as uuidv4 } from 'uuid';

interface Hotel {
  name: string;
  shortName: string;
  location: string;
}


export default class HotelService {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  // Method to get all hotels with pagination
  async getAllHotels(cursor: string | null, itemsPerPage: number = 20) {
    return await paginate(this.prisma, 'hotels', 'hotelId', cursor, itemsPerPage);
  }

  // Method to get a hotel by ID
  async getHotelById(hotelId: string) {
    try {
      const data = await this.prisma.hotels.findUnique({
        where: {
          hotelId: hotelId,
        },
      });
      return data ? data : {};
    } catch (error) {
      console.error('Error fetching hotel:', error);
      throw new Error('Failed to retrieve hotel');
    }
  }

  // Method to create a new hotel
  async createHotel(data: Hotel): Promise<Object> {
    try {
      const hotelId: string = uuidv4();

      const payload = {
        hotelId: hotelId,
        name: data.name,
        shortName: data.shortName,
        location: data.location,
      };

      const hotel = await this.prisma.hotels.create({
        data: payload,
      });
      return hotel;
    } catch (error) {
      console.error('Error creating hotel:', error);
      throw new Error('Failed to create hotel');
    }
  }

  // Method to update an existing hotel
  async updateHotel(
    hotelId: string,
    updateFields: Partial<{ name: string; location: string; shortName: string; [key: string]: any }>
  ): Promise<Object> {
    try {
      const updateData = Object.fromEntries(
        Object.entries(updateFields).filter(([_, value]) => value !== undefined && value !== null)
      );

      const hotel = await this.prisma.hotels.update({
        where: { hotelId: hotelId },
        data: updateData,
      });

      return hotel;
    } catch (error) {
      console.error('Error updating hotel:', error);
      throw new Error('Failed to update hotel');
    }
  }
}