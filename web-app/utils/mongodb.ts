// utils/mongodb.ts
import { MongoClient } from 'mongodb';
import { v4 } from 'uuid';
import { UserDocument } from '../types/UserDocument';
import encrypt from './encrypt';
import twofactorbridge from './twofactorbridge';

const uri = (process.env.MONGODB_URI as string)
    .replace('<password>', process.env.MONGODB_PASSWORD as string)
    .replace('<dbname>', process.env.MONGODB_DB as string)
    .replace('<username>', process.env.MONGODB_USERNAME as string);
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

console.log('Connected to MongoDB');

const createAdminUserIfNotExists = async () => {
    const client = await clientPromise;

    const db = client.db(process.env.MONGODB_DB);

    const users = db.collection('users');
    const admin = await users.findOne({ email: process.env.DEFAULT_ADMIN_EMAIL as string }),
        userCount = await db.collection('users').countDocuments();

    const { encrypted, iv: hash } = twofactorbridge.encrypt(twofactorbridge.generateSecretKey());

    if (!admin) {
        let adminUser: UserDocument = {
            email: process.env.DEFAULT_ADMIN_EMAIL as string,
            password: await encrypt.hashPassword(process.env.DEFAULT_ADMIN_PASSWORD as string),
            iat: new Date().getTime(),
            updatedAt: new Date().getTime(),
            name: process.env.DEFAULT_ADMIN_NAME as string,
            secret: v4(),
            permissions: ['*'],
            userId: userCount + 1,
            roles: ['root'],
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

        await users.insertOne(adminUser);

        console.log(
            'Created admin user ' +
                process.env.DEFAULT_ADMIN_EMAIL +
                ' with password ' +
                process.env.DEFAULT_ADMIN_PASSWORD
        );
    }
};

createAdminUserIfNotExists();

export default clientPromise;
