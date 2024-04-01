import { useDatabase } from '@/components/hooks/useDatabase';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserDocument } from '../../../../../types/UserDocument';
import encrypt from '../../../../../utils/encrypt';
import { validateUserSession, overrideCurrentSession } from '../../../../../utils/sessionmanager';
import { createToken, validateToken } from '../../../../../utils/tokenizer';
import twofactorbridge from '../../../../../utils/twofactorbridge';
import {
    handleTwoFactorToggleValidation,
    handleTwoFactorValidation,
} from '../../../../../utils/validation/UserValidation';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') return handleTwoFactorToggleState(req, res); //TURN ON / OFF TWO FACTOR

    if (req.method === 'POST') return handleTwoFactorVerification(req, res); //LOGIN WITH TWO FACTOR

    if (req.method === 'GET') return handleTwoFactorConnectionToApp(req, res); //SETUP TWO FACTOR

    return res.status(405).json({ error: 'Method not allowed' });
}

const handleTwoFactorToggleState = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        handleTwoFactorToggleValidation(req.body);

        const xClientState = req.cookies['x-client-state'] || req.headers['authorization'];

        if (!xClientState) throw new Error('Forbidden');

        let tokenDecode = await validateUserSession(xClientState as string, 'auth-token');

        let token = twofactorbridge.decrypt(tokenDecode.user.twoFactor.secret, tokenDecode.user.twoFactor.iv);

        await twofactorbridge.validateCode(req.body.code, token as string);

        let db = await useDatabase();

        await db.collection('users').updateOne(
            { _id: new ObjectId(tokenDecode.user._id) },
            {
                $set: {
                    'twoFactor.enabled': Boolean(req.body.enabled),
                },
            }
        );

        return res.status(200).json({ message: 'Two factor authentication updated' });
    } catch (e: any) {
        if (!e) return res.status(500).json({ error: 'Invalid code' });

        return res.status(500).json({ error: e.message });
    }
};

const handleTwoFactorVerification = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        handleTwoFactorValidation(req.body);

        const xClientState = req.cookies['x-client-state'] || req.headers['authorization'];

        if (!xClientState) throw new Error('Forbidden');

        let tokenDecode = await validateUserSession(xClientState as string, 'two-factor');

        let token = twofactorbridge.decrypt(tokenDecode.user.twoFactor.secret, tokenDecode.user.twoFactor.iv);

        await twofactorbridge.validateCode(req.body.code, token as string);

        let updateSessionToken = await overrideCurrentSession(xClientState, 'auth-token');

        res.setHeader(
            'Set-Cookie',
            `x-client-state=${updateSessionToken}; Path=/; HttpOnly; Max-Age=900` //15min
        );

        let dataCopy: any = { ...tokenDecode.user };

        dataCopy.password = undefined;
        dataCopy.twoFactor = undefined;

        console.log('two factor login', updateSessionToken);

        return res.status(200).json({ message: 'Login successful', user: dataCopy });
    } catch (e: any) {
        console.log(e);

        if (!e) return res.status(401).json({ error: 'Invalid code' });

        return res.status(500).json({ error: e.message });
    }
};

const handleTwoFactorConnectionToApp = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const xClientState = req.cookies['x-client-state'] || req.headers['authorization'];

        if (!xClientState) throw new Error('Forbidden');

        let tokenDecode = await validateUserSession(xClientState as string, 'auth-token');

        let token = twofactorbridge.decrypt(tokenDecode.user.twoFactor.secret, tokenDecode.user.twoFactor.iv);

        const image = await twofactorbridge.generateQRCode(`${tokenDecode.user.email}`, token as string);

        if (!tokenDecode.user.twoFactor.enabled) {
            //return qr code
            res.status(200).json({ image, enabled: tokenDecode.user.twoFactor.enabled });
        } else {
            if (!tokenDecode.session.twoFactor) {
                throw new Error('You must use two factor authentication to request this resource');
            }
        }

        return res.status(200).json({ image, enabled: tokenDecode.user.twoFactor.enabled });
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
};
