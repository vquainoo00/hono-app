import { PrismaClient } from '@prisma/client';
import { paginate } from '../utils/pagination';


type user = {
  email : string
  lastName :string
  firstName :string
  mobile :string
  photoUrl :string

}

// Service function to get all users

export const getAllUsers = async (prisma: PrismaClient, cursor: string | null, itemsPerPage: number = 20) => {
  const data = paginate(prisma, 'users', 'email', cursor, itemsPerPage);
  return data
};

// Service function to get user by id

export const getUserById = async (prisma: PrismaClient, email: string)=> {
  try {
    let data = await prisma.users.findUnique({

      where: {
        email: email,
      },
    });
    return data ? data : {};
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to retrieve user');
  }
};




// Service function to create a new user
export const createUser = async (
  prisma: PrismaClient, 
  data: user,
  ): Promise<Object> => {
  try {
    const payload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      photoUrl: data.photoUrl
    }
    console.log("User payload: ", payload)
    
    const user = await prisma.users.create({data: payload});

    return user;

  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};


export const updateUser = async (
  prisma: PrismaClient, 
  email: string,
  updateFields: Partial<{ name: string; location: string; shortName: string; [key: string]: any }>
): Promise<Object> => {
  try {
    const updateData = Object.fromEntries(
      Object.entries(updateFields).filter(([_, value]) => value !== undefined && value !== null)
    );

    const user = await prisma.users.update({
      where: { email: email },
      data: updateData, // Only update the fields that are provided
    });

    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};