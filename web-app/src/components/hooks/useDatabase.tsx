import clientPromise from '../../../utils/mongodb';

export async function useDatabase() {
    try {
        return (await clientPromise).db(process.env.MONGODB_DB);
    } catch (e: any) {
        throw new Error('Unable to connect to database');
    }
}
