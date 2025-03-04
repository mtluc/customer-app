
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpError {
    statusCode: number;
    message: string;
    error: any;
}