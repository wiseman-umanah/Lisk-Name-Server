import { Client, Databases, ID } from "node-appwrite";
import dotenv from 'dotenv'


dotenv.config();

const client = new Client();

const databases = new Databases(client);

// These values come from your Appwrite Console
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID!;
const API_KEY   = process.env.APPWRITE_API_KEY!;
const ENDPOINT = process.env.APPWRITE_ENDPOINT!;
const DB_ID = process.env.APPWRITE_DATABASE_ID!;
const COLL_ID = process.env.APPWRITE_COLLECTION_ID!;

client
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

export { databases, client, DB_ID, COLL_ID, ID };
