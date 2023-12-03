import { useDatabase } from '@/components/hooks/useDatabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserDocument } from '../../../../../types/UserDocument';
import encrypt from '../../../../../utils/encrypt';
import { validateUserSession } from '../../../../../utils/sessionmanager';
import { createToken, validateToken } from '../../../../../utils/tokenizer';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') return handleUserGetProfile(req, res);

    res.status(405).json({ error: 'Method not allowed' });
}

const handleUserGetProfile = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const xClientState = req.cookies['x-client-state'];

        if (!xClientState) throw new Error('Forbidden');

        let tokenDecode = await validateUserSession(xClientState as string, 'auth-token');

        let dataCopy: any = { ...tokenDecode.user };

        dataCopy.password = undefined;
        dataCopy.twoFactor = undefined;

        res.status(200).json({ user: dataCopy, session: tokenDecode.session, token: tokenDecode.token });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};
