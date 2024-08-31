import BranchesService from '../services/branches';
import { BranchesSchema } from '../schemas/branches';
import { createResponse, errorResponse } from '../utils/responses';
import { ZodError } from 'zod';

interface BranchesRequest {
  body: any;
  req: {
    query: (name: string) => string | any;
    param: (name: string) => string | any;
    json: () => Promise<any>;
  };
  json: (response: object, status?: number) => Response;
}

export default class BranchesController {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async createBranch(request: BranchesRequest) {
    const result = BranchesSchema.safeParse(await request.req.json());
    if (!result.success) {
      return this.handleValidationError(result.error, request);
    }

    const branchesService = new BranchesService(this.prisma);
    try {
      const room = await branchesService.createBranch(result.data);
      return request.json(createResponse(201, 'Branch created successfully', room), 201);
    } catch (error) {
      return this.handleServiceError(error, request);
    }
  }

  async getBranches(request: BranchesRequest) {
    const branchesService = new BranchesService(this.prisma);
    const hotelId = request.req.param('hotelId')

    try {
      const { data, metadata } = await branchesService.getBranches(hotelId);
      return request.json(createResponse(200, 'Branches retrieved successfully', data, metadata), 200);
    } catch (error) {
      return this.handleServiceError(error, request);
    }
  }


  private handleValidationError(error: ZodError, request: BranchesRequest) {
    return request.json(
      errorResponse(400, 'Invalid request data', null, error.issues),
      400
    );
  }

  private handleServiceError(error: unknown, request: BranchesRequest) {
    console.error('Service error:', error);
    return request.json(
      errorResponse(500, 'Internal server error'),
      500
    );
  }
}
