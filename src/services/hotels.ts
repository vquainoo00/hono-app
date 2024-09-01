import { paginate } from '../utils/pagination';
import { v7 as uuidv7 } from 'uuid';


interface Hotel {
  name: string;
  description?: string;
  headOfficeLocation?: string;
  contactPhone?: string;
  contactEmail?: string;

}

interface UpdateHotelFields {
  name?: string;
  shortName?: string;
  location?: string;
  [key: string]: any;
}

export default class HotelService {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async getAllHotels(cursor: string | null, itemsPerPage: number = 20) {
    return await paginate(this.prisma, 'hotels', 'hotelId', cursor, itemsPerPage);
  }

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


  async createHotel(data: Hotel): Promise<Object> {
    try {
      const hotelId: string = uuidv7();

      const payload = {
        hotelId: hotelId,
        name: data.name,
        description: data.description,
        headOfficeLocation: data.headOfficeLocation,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail
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
  async updateHotel(hotelId: string, updateFields: UpdateHotelFields) {
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