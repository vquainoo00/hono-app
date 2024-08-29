// schemas/hotel.ts
import { z } from 'zod';

// Define the Zod schema for validating hotel data
export const UserSchema = z.object({
  email: z.string().min(1, 'email is required'),
  firstName: z.string().min(1, 'firstName is required'),
  lastName: z.string().min(1, 'lastName is required'),
  mobile: z.string().min(1, 'mobile is required'),
  photoUrl: z.string().min(1, 'photoUrl is required')
}).refine(data => Object.values(data).some(value => value), {
  message: 'All required fields must be provided',
  path: [] // General error message for the whole object
});
