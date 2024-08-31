import { z } from 'zod';

// Define the Zod schema for Branches
export const BranchesSchema = z.object({
  branchName: z.string().min(1, "Branch name is required"),
  hotelId: z.string().min(1, "Hotel ID is required"),
  address: z.string().min(1, "Address is required").optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email format"),
});