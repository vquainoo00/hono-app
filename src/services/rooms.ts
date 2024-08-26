import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// Service function to get all hotels
export const getAllRooms = async (prisma: PrismaClient) => {
  try {
    return await prisma.rooms.findMany();
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw new Error('Failed to retrieve rooms');
  }
};

// Service function to create a new hotel
export const createRoom = async (prisma: PrismaClient, name: string, floor: string): Promise<string> => {
  try {
    const id: string = uuidv4();
    const room = await prisma.rooms.create({
      data: { id, name, floor },
    });
    
    // Return the hotel id, which is of type string
    return room.id;
  } catch (error) {
    console.error('Error creating hotel:', error);
    throw new Error('Failed to create hotel');
  }
};