import {Request, Response, NextFunction} from 'express'
import redisClient from "../helpers/redisClient";
import {createSuccessResponse} from "../utils/responseUtils";

export const CacheUsersMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id

    let key = ''
    if (userId) {
        key = `user:${userId}`
    } else {
        key = 'user:users'
    }

    redisClient.get(key, (err, cachedData) => {
        if (err) {
            next();
        } else if (cachedData) {
            res.json(createSuccessResponse({[key.includes('users') ? 'users' : 'user']: JSON.parse(cachedData)}));
        } else {
            next();
        }
    });
};