import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// Service function to get all hotels
export const getAllHotels = async (prisma: PrismaClient)=> {
  try {
    return await prisma.hotels.findMany();
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw new Error('Failed to retrieve hotels');
  }
};

// Service function to create a new hotel
export const createHotel = async (
  prisma: PrismaClient, 
  name: string, 
  location: string, 
  shortName: string
  ): Promise<string> => {
  try {
    const id: string = uuidv4();
    const hotel = await prisma.hotels.create({
      data: { id, name, shortName, location},
    });
    // Return the hotel id, which is of type string
    return hotel.id;
  } catch (error) {
    console.error('Error creating hotel:', error);
    throw new Error('Failed to create hotel');
  }
};