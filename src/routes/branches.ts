import { Hono } from 'hono';
import { getPrismaClient } from '../prismaClient';
import { BranchesSchema } from '../schemas/branches';
import type { Env, AppContext } from '../types';
import { createResponse, errorResponse} from '../utils/responses';
import Branches from '../services/branches';
import BranchService from '../services/branches';



export const branchesRoutes = new Hono<{ Bindings: Env; Variables: AppContext }>();

// Fetch all branches for a hotel
branchesRoutes.get('/:hotelId', async (c) => {
  const prisma = getPrismaClient(c.env);
  const hotelId = c.req.param('hotelId')

  const branchesService = new BranchService(prisma);


  const data = await branchesService.getBranches(hotelId);

  return c.json(
    createResponse(
        200, 
        'Branches retrieved successfully', 
        data,
        []
    ), 
    200
);
});


// Create a new branch
branchesRoutes.post('/', async (c) => {

  const prisma = getPrismaClient(c.env);
  const body = await c.req.json();
  const parsed = BranchesSchema.safeParse(body);
  const branchesService = new BranchService(prisma);

  if (!parsed.success) {
    return c.json(
      errorResponse(
            400, 
            'Invalid request data', 
            null, 
            parsed.error.issues
        ), 
        400
    );
}

  const { data } = parsed;  


  const branch = await branchesService.createBranch(data);
  return c.json(
    createResponse(
        201, 
        'Branch created successfully', 
        branch,
    ), 
    201
);
});

