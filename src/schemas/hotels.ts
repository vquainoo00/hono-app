// schemas/hotel.ts
import { z } from 'zod';

// Define the Zod schema for validating hotel data
export const HotelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  shortName: z.string().min(1, 'Short name is required')
}).refine(data => Object.values(data).some(value => value), {
  message: 'At least one of the required fields (name, location, shortName) must be provided',
  path: [] // General error message for the whole object
});

export type HotelInput = z.infer<typeof HotelSchema>;
