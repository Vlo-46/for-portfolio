import {Request, Response, NextFunction} from "express";
import {DeepPartial} from 'utility-types';
import {verifyToken} from "../helpers/jwt";
import {createErrorResponse} from "../utils/responseUtils";

export interface AuthenticatedRequest extends DeepPartial<Request> {
    user?: {
        userId: string,
        email: string,
        iat: number,
        exp: number
    };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = (req.headers?.authorization as string).replace('Bearer ', '')
        if (!token) {
            res.status(401).json(createErrorResponse(undefined, "Unauthorized - Missing token"));
            return
        }

        const decoded: any = verifyToken(token);
        if (typeof decoded === 'string') {
            res.status(401).json(createErrorResponse(undefined, "Unauthorized - Invalid token"));
        }

        req.user = decoded;
        next();
    } catch (error) {
        next(error)
    }
}