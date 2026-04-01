import type { Request, Response, NextFunction } from 'express'
import { verifyUserToken } from '../auth/utils/token'
import ApiError from '../auth/utils/api-error'

export function authenticationMiddleware() {
    return function (req: Request, res: Response, next: NextFunction) {
        const header = req.headers['authorization']
        if (!header) return next()

        if (!header.startsWith('Bearer ')) {
            throw ApiError.badRequest("authorization header must start with Bearer")
        }

        const token = header.split(' ')[1]

        if (!token) throw ApiError.badRequest("authorization header must start with Bearer and followed by token")

        const user = verifyUserToken(token)

        // @ts-ignore
        req.user = user

        next()
    }
}

export function restrictToAuthenticatedUser() {
    return function (req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        if (!req.user) throw ApiError.unauthorized('Authentication Required')
        return next()
    }
}