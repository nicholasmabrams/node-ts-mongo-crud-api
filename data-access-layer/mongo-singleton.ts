import { MongoClient } from "mongodb";

let connectionInstance: Promise<MongoClient>;

export async function connectMongo() {
    const dbPort = '27017';
    const dbConnectionString = `mongodb://127.0.0.1:${dbPort}/?readPreference=primary&appname=Capture%20Life%20Assessment&directConnection=true&ssl=false`;
    const client = new MongoClient(dbConnectionString);

     if (!connectionInstance) {
        try {
            connectionInstance = client.connect();
            return connectionInstance;
        } catch (error) {
            if (typeof error === 'string') {
                throw new Error(error);
            } else if (error instanceof Error) {
                throw error;
            }
        }
     } else {

        // Recall cached connection
        return connectionInstance;
     }
};
