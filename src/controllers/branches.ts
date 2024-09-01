import BranchesService from '../services/branches';
import { BranchesSchema } from '../schemas/branches';
import { createResponse, handleValidationError, handleServiceError} from '../utils/responses';

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
      return handleValidationError(result.error, request);
    }

    const branchesService = new BranchesService(this.prisma);
    try {
      const room = await branchesService.createBranch(result.data);
      return request.json(createResponse(201, 'Branch created successfully', room), 201);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

  async getBranches(request: BranchesRequest) {
    const branchesService = new BranchesService(this.prisma);
    const hotelId = request.req.query('hotelId')

    try {
      const data  = await branchesService.getBranches(hotelId);
      return request.json(createResponse(200, 'Branches retrieved successfully', data, []), 200);
    } catch (error) {
      return handleServiceError(error, request);
    }
  }

}
