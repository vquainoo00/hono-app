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


// Define the Zod schema for validating hotel data
export const UpdateHotelSchema = z.object({
  hotelId: z.string().min(1, 'Hotel ID is required'), // Required field
  name: z.string().min(1, 'Name is required').optional(), // Optional field
  location: z.string().min(1, 'Location is required').optional(), // Optional field
  shortName: z.string().min(1, 'Short name is required').optional(), // Optional field
}).refine(data => {
  // Ensure at least one of the optional fields is provided
  return (
    data.name !== undefined && data.name !== '' ||
    data.location !== undefined && data.location !== '' ||
    data.shortName !== undefined && data.shortName !== ''
  );
}, {
  message: 'At least one of the fields (name, location, shortName) must be provided',
  path: [], // General error message for the whole object
});
export type HotelInput = z.infer<typeof HotelSchema>;
