import jwt from 'jsonwebtoken'

interface UserTokenPayload{
    id: string
}

export function createUserToken(payload: UserTokenPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}

export function verifyUserToken(token: string){
    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET as string) as UserTokenPayload;
        return decodedPayload;
    } catch (error) {
        throw new Error("Invalid token");
    }
}