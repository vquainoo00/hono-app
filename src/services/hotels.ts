import { PrismaClient } from '@prisma/client';
import { paginate } from '../utils/pagination';

import { v4 as uuidv4 } from 'uuid';

// Service function to get all hotels

export const getAllHotels = async (prisma: PrismaClient, cursor: string | null, itemsPerPage: number = 20) => {
  const data = paginate(prisma, 'hotels', cursor, itemsPerPage);
  return data
};

// Service function to get hotel by id

export const getHotelById = async (prisma: PrismaClient, hotelId: string)=> {
  try {
    let data = await prisma.hotels.findUnique({

      where: {
        id: hotelId,
      },
    });
    return data ? data : {};
  } catch (error) {
    console.error('Error fetching hotel:', error);
    throw new Error('Failed to retrieve hotel');
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