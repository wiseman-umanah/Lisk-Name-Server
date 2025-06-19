import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyApiKey } from "../utils/apiKey";


export const requireApiKey: RequestHandler = (req, res, next) => {
  const key = req.headers.authorization?.split(" ")[1];

  if (!key || !verifyApiKey(key)) {
    res.status(403).json({ error: "Invalid or missing API key" });
    return;
  }

  next();
};
