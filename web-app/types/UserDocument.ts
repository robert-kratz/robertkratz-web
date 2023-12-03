import { ObjectId } from 'mongodb';

export interface UserDocument {
    _id?: ObjectId;
    email: string;
    name: string;
    password: string;
    permissions: string[];
    roles: string[];
    userId: number;
    secret: string;
    iat: number;
    updatedAt: Date | number;
    twoFactor: {
        secret: string;
        iv: string;
        enabled: boolean;
    };
    invited: {
        by: string | null;
        iat: Date | number | null;
    };
    suspended?: {
        by: string | null;
        iat: Date | number | null;
        reason: string | null;
    };
}
