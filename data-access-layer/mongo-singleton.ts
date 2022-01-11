import { MongoClient } from "mongodb";
import { isPromise } from "util/types";

let connectionInstance: Promise<MongoClient>;

export async function connectMongo() {
    const dbPort = '27017';
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    // mongodb+srv://
    const dbConnectionString = `mongodb://127.0.0.1:${dbPort}/?readPreference=primary&appname=Capture%20Life%20Assessment&directConnection=true&ssl=false`;
    const client = new MongoClient(dbConnectionString);

     if (!connectionInstance || !isPromise(connectionInstance)) {
        try {
            // Connect to the MongoDB cluster
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
