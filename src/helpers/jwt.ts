import { sign, verify, Secret } from 'jsonwebtoken';

const secret: Secret = process.env.JWT_SECRET_KEY as string || "egelFHE&*sfalk@!@&!GJAafgafa";

export const generateToken = (payload: object): string => {
    return sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): object | string => {
    try {
        return verify(token, secret);
    } catch (err) {
        return 'Invalid token';
    }
};