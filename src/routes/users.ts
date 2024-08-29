import { Hono } from 'hono';
import { getPrismaClient } from '../prismaClient';
import { getAllUsers, createUser, getUserById } from '../services/users';
import { UserSchema} from '../schemas/users';
import type { Env, AppContext } from '../types';
import { createResponse, errorResponse} from '../utils/responses';



export const userRoutes = new Hono<{ Bindings: Env; Variables: AppContext }>();

// Fetch all users
userRoutes.get('/', async (c) => {
  const prisma = getPrismaClient(c.env);
  const cursor = c.req.query('cursor') || null
  const itemsPerPage = parseInt(c.req.query('perPage') || '5', 10);


  const data = await getAllUsers(prisma, cursor, itemsPerPage);

  return c.json(
    createResponse(
        200, 
        'Users retrieved successfully', 
        data
    ), 
    200
);
});

// Fetch by Id
userRoutes.get('/:userId', async (c) => {
  const prisma = getPrismaClient(c.env);
  const user = await getUserById(prisma, c.req.param('userId'));
  return c.json(
    createResponse(
        200, 
        'User retrieved successfully', 
        user
    ), 
    200
);
});

// Create a new user
userRoutes.post('/', async (c) => {

  const prisma = getPrismaClient(c.env);
  const body = await c.req.json();
  const parsed = UserSchema.safeParse(body);

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

  const {data} = parsed;


  const user = await createUser(
    prisma, data
    );
  return c.json(
    createResponse(
        201, 
        'User created successfully', 
        user,
    ), 
    201
);
});
