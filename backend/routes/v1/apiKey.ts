import { Router, Request, Response } from "express";
import { ethers } from "ethers";
import { generateApiKey, storeApiKey } from "../../utils/apiKey";

const router = Router();

router.post("", async (req: Request, res: Response): Promise<void> => {
  const { address, message, signature } = req.body;

  try {
    const recovered = ethers.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
		res.status(401).json({ error: "Invalid signature" });
		return;
    }

    const key = generateApiKey();
    storeApiKey(address, key);
    res.json({ apiKey: key });
  } catch (err) {
    res.status(400).json({ error: "Verification failed", details: err });
  }
});

export { router };
