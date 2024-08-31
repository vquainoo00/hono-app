// pagination.ts

import { PrismaClient } from '@prisma/client';

interface PaginationResult<T> {
  data: T[];
  metadata: {
    hasNextPage: boolean;
    nextCursor: string | null;
  }
  
}

export async function paginate<T>(
  prisma: PrismaClient,
  model: keyof PrismaClient,
  orderKey: string,
  cursor: string | null,
  itemsPerPage: number = 20,
  filters?: object
): Promise<PaginationResult<T>> {
  const take = itemsPerPage + 1; // Fetch one extra item to check if there's a next page

  const query: any = {
    take,
    orderBy: { [orderKey]: 'desc' },
  };

  if (cursor) {
    query.skip = 1; // Skip the cursor item itself
    query.cursor = { [orderKey]: cursor };
  }

  // Fetch data from the specified model
  let data: any[];

  if (filters) {
    data = await (prisma[model] as any).findMany({where: {filters}});
  }
  else {
    data = await (prisma[model] as any).findMany(query);
  }

  const hasNextPage = data.length > itemsPerPage;
  const resultData = hasNextPage ? data.slice(0, -1) : data; // Remove the extra item if next page exists
  const nextCursor = hasNextPage ? resultData[resultData.length - 1][orderKey] : null;

  return {
    data: resultData, metadata: {hasNextPage: hasNextPage, nextCursor: nextCursor}
  };
}
