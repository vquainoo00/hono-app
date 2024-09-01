// schemas/hotel.ts
import { z } from 'zod';

// Define the Zod schema for validating hotel data
export const HotelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'description is required'),
  contactPhone: z.string().min(6, 'contactPhone is required'),
  contactEmail: z.string().min(6, 'contactEmail is required'),
  headOfficeLocation: z.string().min(6, 'headOfficeLocation is required')

}).refine(data => Object.values(data).some(value => value), {
  message: 'At least one of the required fields must be provided',
  path: [] // General error message for the whole object
});


// Define the Zod schema for validating hotel data
export const UpdateHotelSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  contactPhone: z.string().min(6).optional(),
  contactEmail: z.string().min(6).optional(),
  headOfficeLocation: z.string().min(2).optional(),
}).refine(data => Object.values(data).some(value => value), {
  message: 'At least one of the required fields must be provided',
  path: [] // General error message for the whole object
});

export type HotelInput = z.infer<typeof HotelSchema>;
