import { ObjectId } from 'mongodb';
import { TokenTypes } from './TokenTypes';

export interface SessionDocument {
    _id?: ObjectId;
    user: ObjectId;
    secret: string;
    iat: number;
    exp: number;
    active: boolean;
    email: string;
    twoFactor: boolean;
    type: TokenTypes;
}
