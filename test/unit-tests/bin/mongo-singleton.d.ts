import { MongoClient } from "mongodb";
export declare function connectMongo(): Promise<MongoClient | undefined>;
