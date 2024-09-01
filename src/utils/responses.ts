// utils/responses.ts
import { ZodError } from 'zod';

export interface JsonResponse {
    statusCode: number;
    message: string;
    data?: any;
    metadata?: {},
    errors?: string[];
}



export function createResponse(statusCode: number, message: string, data: any = null, metadata: {} = {}, errors: string[] = []): JsonResponse {
    const response: JsonResponse = {
        statusCode,
        message,
    };

    if (data) {
        response.data = data;
    }

    response.metadata = metadata;

    if (errors.length > 0) {
        response.errors = errors;
    }

    return response;
}



export function errorResponse(statusCode: number, message: string, data: any = null, errors: any[] = []): JsonResponse {
    const response: JsonResponse = {
        statusCode,
        message,
    };

    if (data) {
        response.data = data;
    }

    if (errors.length > 0) {
        response.errors = errors;
    }

    return response;
}

export function handleValidationError(error: ZodError, request: any) {
    return request.json(
      errorResponse(400, 'Invalid request data', null, error.issues),
      400
    );
  }

export function handleServiceError(error: unknown, request: any) {
    console.error('Service error:', error);
    return request.json(
      errorResponse(500, 'Internal server error'),
      500
    );
  }