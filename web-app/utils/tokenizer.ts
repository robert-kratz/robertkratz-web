import Token, { TokenTypes } from '../types/TokenTypes';
import jwt from 'jsonwebtoken';
import { UserDocument } from '../types/UserDocument';
import { SessionDocument } from '../types/SessionDocument';
import { ObjectId } from 'mongodb';

let TokenDuration = {
    'two-factor': 60 * 60, // 1 hour
    'reset-password': 60 * 60, // 1 hour
    'email-verification': 60 * 60, // 1 hour
    'auth-token': 60 * 60 * 24, // 1 day
};

export function createToken(type: TokenTypes, user: UserDocument, session: SessionDocument) {
    if (!session?._id) throw new Error('SessionId is required');
    if (!user?._id) throw new Error('UserId is required');

    let token: Token = {
        type: type,
        email: user.email,
        userId: user.userId,
        user: user._id as ObjectId,
        iat: user.iat,
        twoFactor: type === 'two-factor',
        session: session._id as ObjectId,
    };

    return jwt.sign(token, process.env.JWT_SECRET as string, {
        expiresIn: TokenDuration[type],
    });
}

export function validateToken(token: string, type?: TokenTypes) {
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Token;

        try {
            if (type && (decoded as Token).type !== type) throw new Error('Invalid token');
        } catch (error) {
            throw new Error('Invalid token, use a "' + type + '" token');
        }

        return decoded;
    } catch (err: any) {
        console.log(err);

        if (err?.message === 'jwt expired') throw new Error('Token expired');

        if (err?.message === 'invalid signature') throw new Error('Invalid token');

        if (err) throw new Error('Invalid token');
    }
}

export function getTokenDuration(type: TokenTypes) {
    return TokenDuration[type];
}
