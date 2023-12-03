import { useDatabase } from '@/components/hooks/useDatabase';
import { ObjectId } from 'mongodb';
import { SessionDocument } from '../types/SessionDocument';
import { TokenTypes } from '../types/TokenTypes';
import { UserDocument } from '../types/UserDocument';
import { createToken, getTokenDuration, validateToken } from './tokenizer';

export async function startUserSession(type: TokenTypes, user: UserDocument) {
    const db = await useDatabase();

    let session: SessionDocument = {
        active: true,
        email: user.email,
        user: user._id as ObjectId,
        secret: user.secret,
        iat: user.iat,
        exp: user.iat,
        twoFactor: Boolean(type === 'auth-token' && user.twoFactor.enabled),
        type: type,
    };

    let inseredSession = await db.collection('sessions').insertOne(session as object);

    session._id = inseredSession.insertedId;

    return createToken(type, user, session);
}

export async function validateUserSession(token: string, type?: TokenTypes) {
    const db = await useDatabase();

    let decoded = validateToken(token, type);

    let sessionId = decoded?.session as ObjectId | undefined;

    if (!sessionId) throw new Error('Invalid session');

    let sessionExists = await db.collection('sessions').findOne<SessionDocument>({ _id: new ObjectId(sessionId) });

    if (!sessionExists) throw new Error('Invalid session');

    if (!sessionExists.active) throw new Error('Session expired');

    let userExists = await db.collection('users').findOne<UserDocument>({ email: decoded?.email });

    if (!userExists) throw new Error('User not found');

    if (userExists?.suspended) throw new Error('User suspended');

    return {
        user: userExists,
        session: sessionExists,
        token: decoded,
    };
}

export async function overrideCurrentSession(token: string, type: TokenTypes) {
    let tokenDecode = await validateUserSession(token);

    const db = await useDatabase();

    let session = tokenDecode.session;

    //delete session
    await db.collection('sessions').updateOne({ _id: session._id }, { $set: { active: false } });

    return await startUserSession(type, tokenDecode.user);
}

export async function endUserSession(token: string) {
    let decoded = await validateUserSession(token);

    const db = await useDatabase();

    let sessionId = decoded.session._id as ObjectId | undefined;

    //delete session
    await db.collection('sessions').updateOne({ _id: new ObjectId(sessionId) }, { $set: { active: false } });

    return decoded;
}
