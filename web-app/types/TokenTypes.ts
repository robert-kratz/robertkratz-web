import { ObjectId } from 'mongodb';

export default interface Token {
    _id?: string;
    email: string;
    userId: number;
    user: ObjectId;
    type: TokenTypes;
    iat: Date | number;
    twoFactor: boolean;
    session: ObjectId;
}

type TokenTypes = 'two-factor' | 'reset-password' | 'email-verification' | 'auth-token';

export type { TokenTypes };
