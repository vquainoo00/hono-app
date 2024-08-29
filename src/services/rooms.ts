import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { paginate } from '../utils/pagination';


type rooms = {
  name: string
  hotelId: string,
}

// Service function to get all room

export const getAllRooms = async (prisma: PrismaClient, cursor: string | null, itemsPerPage: number = 20) => {
  const data = paginate(prisma, 'rooms', 'roomId', cursor, itemsPerPage);
  return data
};


// Service function to create a new room
export const createRoom = async (
  prisma: PrismaClient, 
  data: rooms, 
): Promise<Object> => {
  try {
    const roomId: string = uuidv4(); // Generating a unique ID for the room
    const payload = {
      roomId: roomId,
      name: data.name,
      hotelId: data.hotelId,
    }
    const room = await prisma.rooms.create({
      data: payload
    });
    
    return room;
  } catch (error) {
    console.error('Error creating room:', error);
    throw new Error('Failed to create room');
  }
};

// Service function to get all room categories
export const getAllRoomCategories = async (prisma: PrismaClient, hotelId: string) => {
  try {
    return await prisma.roomCategories.findMany({
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
export const createRoomCategory = async (
  prisma: PrismaClient, 
  name: string, 
  hotelId: string
): Promise<Object> => {
  try {
    const roomCategoryId: string = uuidv4(); // Generating a unique ID for the room
    const room = await prisma.roomCategories.create({
      data: { 
        roomCategoryId,     
        name,  
        hotelId
      },
    });
    
    return room;
  } catch (error) {
    console.error('Error creating room category:', error);
    throw new Error('Failed to create room category');
  }
};