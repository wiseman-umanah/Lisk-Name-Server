import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyApiKey } from "../utils/apiKey";


export const requireApiKey: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const key = req.headers.authorization?.split(" ")[1];

    if (!key) {
      res.status(403).json({ error: "API key is missing" });
      return;
    }

    const address = await verifyApiKey(key as string);

    if (!address) {
      res.status(403).json({ error: "Invalid API key" });
      return;
    }

    next();
  } catch (err) {
    console.error("API Key verification failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};