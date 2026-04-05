import jwt from 'jsonwebtoken'
import ApiError from './api-error';

export interface UserTokenPayload{
    id: string
}

export function createUserToken(payload: UserTokenPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}

export function verifyUserToken(token: string){
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET as string) as UserTokenPayload;
    return decodedPayload;
}