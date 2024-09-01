import { v7 as uuidv7 } from 'uuid';


interface Branches {
  branchId: string;
  branchName: string;
  hotelId: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  email?: string;

}

interface UpdateBranches {
  branchName?: string;
  hotelId?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;

}

export default class BranchService {
  private prisma: any;

  constructor(prisma: any){
    this.prisma = prisma
  }

  async createBranch(data: any): Promise<Branches>{
    try {
      const branchId: string = uuidv7();
      const payload = {
        branchId: branchId,
        ...data,

      }

      return await this.prisma.branches.create({data: payload});
    } catch (error) {
      console.error('Error creating branch:', error);
      throw new Error('Failed to create branch');
    }


  }

  async getBranches(hotelId: string) {
    try {
      const data = await this.prisma.branches.findMany({
        where: {
          hotelId: hotelId,
        },
      });
      return data ? data : [];
    } catch (error) {
      console.error('Error fetching branches for hotel:', error);
    }
  }

  async updateBranch(branchId: string, updateFields: UpdateBranches) {
    try {
      const updateData = Object.fromEntries(
        Object.entries(updateFields).filter(([_, value]) => value !== undefined && value !== null)
      );

      const branch = await this.prisma.branches.update({
        where: { branchId: branchId },
        data: updateData,
      });

      return branch;
    } catch (error) {
      console.error('Error updating branch:', error);
      throw new Error('Failed to update branch');
    }
  }
}
