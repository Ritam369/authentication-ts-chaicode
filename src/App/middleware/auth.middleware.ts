import type { Request, Response, NextFunction } from 'express'
import { verifyUserToken } from '../auth/utils/token'
import ApiError from '../auth/utils/api-error'

export function authenticationMiddleware() {
    return function (req: Request, res: Response, next: NextFunction) {
        const header = req.headers['authorization']
        if (!header) return next()

        if (!header.startsWith('Bearer ')) {
            return next(ApiError.badRequest("authorization header must start with Bearer"));
        }

        const token = header.split(' ')[1]

        if (!token) return next(ApiError.badRequest("authorization header must start with Bearer and followed by token"));

        try {
            const user = verifyUserToken(token);
            // @ts-ignore
            req.user = user;
            next();
        } catch (error) {
            return next(ApiError.unauthorized("Invalid token"));
        }
    }
}

export function restrictToAuthenticatedUser() {
    return function (req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        if (!req.user) return next(ApiError.unauthorized('Authentication Required'));
        return next()
    }
}