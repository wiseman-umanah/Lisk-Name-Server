import crypto from "crypto";

const apiKeys = new Map<string, string>(); // key => address

export function generateApiKey(): string {
  return crypto.randomBytes(8).toString("hex");
}

export function storeApiKey(address: string, key: string) {
	for (const [key, addr] of apiKeys.entries()) {
		if (addr.toLowerCase() === address.toLowerCase()) {
		apiKeys.delete(key);
		}
	}
  apiKeys.set(key, address);
}

export function verifyApiKey(key: string): string | null {
  return apiKeys.get(key) || null;
}
