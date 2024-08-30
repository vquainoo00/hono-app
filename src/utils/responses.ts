// utils/responses.ts

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
