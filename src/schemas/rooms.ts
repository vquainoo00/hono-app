// schemas/hotel.ts
import { z } from 'zod';

// Define the Zod schema for validating hotel data
export const RoomSchema = z.object({
  name: z.string().min(1, 'name is required'),
  floor: z.string().min(1, 'floor is required'),
});

export type HotelInput = z.infer<typeof RoomSchema>;
