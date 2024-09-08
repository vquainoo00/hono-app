import { v7 as uuidv7 } from 'uuid';
import { paginate } from '../utils/pagination';


type Rooms = {
  name: string
  hotelId: string,
}
// Service function to get all room

export default class RoomService {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async getAllRooms (cursor: string | null, itemsPerPage: number = 20) {
    return await paginate(this.prisma, 'rooms', 'roomId', cursor, itemsPerPage);
  };


  // Service function to create a new room
  async createRoom (
    data: Rooms, 
  ): Promise<Object> {
    try {
      const roomId: string = uuidv7(); // Generating a unique ID for the room
      const payload = {
        roomId: roomId,
        name: data.name,
        hotelId: data.hotelId,
      }
      const room = await this.prisma.rooms.create({
        data: payload
      });
      
      return room;
    } catch (error) {
      console.error('Error creating room:', error);
      throw new Error('Failed to create room');
    }
  };

  // Service function to get all room categories
  async getAllRoomCategories (hotelId: string) {
    try {
      return await this.prisma.roomCategories.findMany({
        where: {
          hotelId: hotelId // Correct syntax for the where clause
        }
      });
    } catch (error) {
      console.error('Error fetching room categories:', error);
      throw new Error('Failed to retrieve categories');
    }
  };


  // Service function to create a new room
  async createRoomCategory (
    name: string, 
    hotelId: string,
    price: number,
    currency: string
  ): Promise<Object> {
    try {
      const roomCategoryId: string = uuidv7(); // Generating a unique ID for the room
      const room = await this.prisma.roomCategories.create({
        data: { 
          roomCategoryId,     
          name,  
          hotelId,
          price,
          currency
        },
      });
      
      return room;
    } catch (error) {
      console.error('Error creating room category:', error);
      throw new Error('Failed to create room category');
    }
  }
}

  