// pagination.ts

import { PrismaClient } from '@prisma/client';

interface PaginationResult<T> {
  data: T[];
  hasNextPage: boolean;
  nextCursor: string | null;
}

export async function paginate<T>(
  prisma: PrismaClient,
  model: keyof PrismaClient,
  cursor: string | null,
  itemsPerPage: number = 20
): Promise<PaginationResult<T>> {
  const take = itemsPerPage + 1; // Fetch one extra item to check if there's a next page
  const query: any = {
    take,
    orderBy: { id: 'asc' },
  };

  if (cursor) {
    query.skip = 1; // Skip the cursor item itself
    query.cursor = { id: cursor };
  }

  const data = await (prisma[model] as any).findMany(query);

  const hasNextPage = data.length > itemsPerPage;
  const resultData = hasNextPage ? data.slice(0, -1) : data; // Remove the extra item if next page exists
  const nextCursor = hasNextPage ? resultData[resultData.length - 1].id : null;

  return {
    data: resultData,
    hasNextPage,
    nextCursor,
  };
}
