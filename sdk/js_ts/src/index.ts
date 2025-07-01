import axios from "axios";

export class LNSClient {
  private readonly baseUrl = "https://localhost:4000/api/v1";
  private readonly apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error("API key is required");
		this.apiKey = apiKey;
  }

  async resolve(name: string): Promise<string> {
    if (!name) throw new Error("Name is required");

    const url = `${this.baseUrl}/resolve/${name}`;
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
    };

    try {
      const res = await axios.get(url, { headers });
      return res.data.address;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error("Name not registered or expired");
      }
      throw new Error("Failed to resolve name");
    }
  }
}
