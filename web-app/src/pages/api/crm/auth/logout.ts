import { NextApiRequest, NextApiResponse } from 'next';
import { endUserSession } from '../../../../../utils/sessionmanager';
import cookie from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    return handleLogout(req, res);
}

const handleLogout = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const xClientState = req.cookies['x-client-state'];

        if (xClientState) {
            await endUserSession(xClientState as string);

            //remove cookie
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('x-client-state', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 0,
                    path: '/',
                })
            );
        }

        //redirect to login page
        res.writeHead(302, { Location: '/crm/login?utm_campaign=logged_out' });
        res.end();
    } catch (e: any) {
        console.log(e);

        res.status(500).json({ error: e.message });
    }
};
