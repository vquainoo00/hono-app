// schemas/hotel.ts
import { z } from 'zod';

// Define the Zod schema for validating hotel data
export const RoomSchema = z.object({
  number: z.string().min(1, 'number is required'),
  floor: z.string().min(1, 'floor is required'),
  branchId: z.string().min(1, 'branchId is required'),
  roomCategoryId: z.string().min(1, 'branchId is required'),
  hotelId: z.string().min(36, 'hotelId is required'),
});


export const RoomCategoriesSchema = z.object({
  name: z.string().min(1, 'name is required'),
  price: z.number(),
  currency: z.string().min(1, 'name is required'),
  hotelId: z.string().min(36, 'hotelId is required'),
});

