import { useDatabase } from '@/components/hooks/useDatabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { SessionDocument } from '../../../../../types/SessionDocument';
import { UserDocument } from '../../../../../types/UserDocument';
import encrypt from '../../../../../utils/encrypt';
import { startUserSession } from '../../../../../utils/sessionmanager';
import { createToken } from '../../../../../utils/tokenizer';
import { handleUserLoginValidation } from '../../../../../utils/validation/UserValidation';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') return handleLogin(req, res);

    res.status(405).json({ error: 'Method not allowed' });
}

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        handleUserLoginValidation(req.body);

        // const xClientState = req.cookies['x-client-state'];

        // if (xClientState) throw new Error('You are already logged in');

        const db = await useDatabase();

        //find user by email
        const userExists = await db.collection('users').findOne<UserDocument>({
            email: req.body.email,
        });

        if (!userExists) throw new Error('User not found');

        //compare password
        let passwordMatch = await encrypt.comparePassword(req.body.password, userExists.password as string);

        if (!passwordMatch) throw new Error('Password does not match');

        let hasTwoFactor = userExists.twoFactor.enabled;

        let dataCopy: any = { ...userExists };

        if (hasTwoFactor) {
            //generate two factor token
            let token = await startUserSession('two-factor', userExists);

            console.log('two factor token', token);

            res.setHeader(
                'Set-Cookie',
                `x-client-state=${token}; Path=/; HttpOnly; Max-Age=900` //15min
            );

            dataCopy.password = undefined;
            dataCopy.twoFactor = undefined;

            return res.status(301).json({ message: 'Two factor authentication required', user: dataCopy });
        }

        //generate auth token
        let token = await startUserSession('auth-token', userExists);

        res.setHeader(
            'Set-Cookie',
            `x-client-state=${token}; Path=/; HttpOnly; Max-Age=86400` //1 day
        );

        dataCopy.password = undefined;
        dataCopy.twoFactor = undefined;

        return res.status(200).json({ message: 'Login successful', user: dataCopy });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};
