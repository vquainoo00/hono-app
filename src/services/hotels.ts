import { PrismaClient } from '@prisma/client';
import { paginate } from '../utils/pagination';

import { v4 as uuidv4 } from 'uuid';

// Service function to get all hotels

export const getAllHotels = async (prisma: PrismaClient, cursor: string | null, itemsPerPage: number = 20) => {
  const data = paginate(prisma, 'hotels', 'hotelId', cursor, itemsPerPage);
  return data
};

// Service function to get hotel by id

export const getHotelById = async (prisma: PrismaClient, hotelId: string)=> {
  try {
    let data = await prisma.hotels.findUnique({

      where: {
        hotelId: hotelId,
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
  ): Promise<Object> => {
  try {
    const hotelId: string = uuidv4();
    const hotel = await prisma.hotels.create({
      data: { hotelId, name, shortName, location},
    });
    // Return the hotel id, which is of type string
    return hotel;
  } catch (error) {
    console.error('Error creating hotel:', error);
    throw new Error('Failed to create hotel');
  }
};


export const updateHotel = async (
  prisma: PrismaClient, 
  hotelId: string, // Required to identify which hotel to update
  updateFields: Partial<{ name: string; location: string; shortName: string; [key: string]: any }>
): Promise<Object> => {
  try {
    // Filter out undefined or null values from the updateFields object
    const updateData = Object.fromEntries(
      Object.entries(updateFields).filter(([_, value]) => value !== undefined && value !== null)
    );

    // Perform the update operation using prisma.hotels.update()
    const hotel = await prisma.hotels.update({
      where: { hotelId: hotelId }, // Identify the hotel by its ID
      data: updateData, // Only update the fields that are provided
    });

    // Return the updated hotel object
    return hotel;
  } catch (error) {
    console.error('Error updating hotel:', error);
    throw new Error('Failed to update hotel');
  }
};