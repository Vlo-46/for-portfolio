interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export const createSuccessResponse = <T>(data: T, message?: string): ApiResponse<T> => {
    return {
        success: true,
        message: message || 'Request successful',
        data: data
    };
};

export const createErrorResponse = (error: string | undefined, message?: string): ApiResponse<undefined> => {
    return {
        success: false,
        message: message || 'Request failed',
        error: error ? error : 'Error'
    };
};