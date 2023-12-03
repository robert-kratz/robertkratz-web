import { useDatabase } from '@/components/hooks/useDatabase';
import { NextApiRequest, NextApiResponse } from 'next';

import { v4 } from 'uuid';

import { UserDocument } from '../../../../../types/UserDocument';
import encrypt from '../../../../../utils/encrypt';
import { createToken } from '../../../../../utils/tokenizer';
import twofactorbridge from '../../../../../utils/twofactorbridge';
import { handleUserSignUpValidation } from '../../../../../utils/validation/UserValidation';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') return handleSignUp(req, res);

    res.status(405).json({ error: 'Method not allowed' });
}

const handleSignUp = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        handleUserSignUpValidation(req.body);

        const db = await useDatabase();

        //find user by email
        const userExists = await db.collection('users').findOne<UserDocument>({
            email: req.body.email,
        });

        if (userExists) throw new Error('User already exists');

        //hash password
        let hashedPassword = await encrypt.hashPassword(req.body.password);

        let userCount = await db.collection('users').countDocuments();

        const { encrypted, iv: hash } = twofactorbridge.encrypt(twofactorbridge.generateSecretKey());

        let newUser: UserDocument = {
            email: req.body.email,
            password: hashedPassword,
            iat: new Date().getTime(),
            updatedAt: new Date().getTime(),
            name: req.body.name,
            secret: v4(),
            permissions: [],
            userId: userCount + 1,
            roles: [],
            twoFactor: {
                enabled: false,
                secret: encrypted,
                iv: hash,
            },
            invited: {
                by: null,
                iat: null,
            },
        };

        //insert user
        await db.collection('users').insertOne(newUser as Object);

        res.status(200).json({ message: 'Signup successful' });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};
