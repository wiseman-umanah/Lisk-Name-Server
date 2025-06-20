import crypto from "crypto";
import { DB_ID, COLL_ID, ID, databases } from "./database";
import { Query } from "node-appwrite";


export async function generateApiKey(): Promise<string> {
  return crypto.randomBytes(8).toString("hex");
}

export async function storeApiKey(address: string, key: string) {

	try {
		const res = await databases.listDocuments(DB_ID, COLL_ID, [
			Query.equal('address', [address])
		]);
	
		if (res.total > 0) {
			await databases.updateDocument(
				DB_ID,
				COLL_ID,
				res.documents[0].$id,
				{
					key: key
				},
			);
		} else {
			await databases.createDocument(
				DB_ID,
				COLL_ID,
				ID.unique(),
				{
					address: address,
					key: key
				}
			);
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error("Failed to store API key:", message);
	}
}

export async function verifyApiKey(key: string): Promise<string | null> {
  try {
    const res = await databases.listDocuments(
		DB_ID, 
		COLL_ID,
		[
			Query.equal("key", [key]),
		]
	);

    if (res.total > 0) {
      return res.documents[0].address;
    } else {
      return null;
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);
    console.error("API key verification failed:", message);
    return null;
  }
}
