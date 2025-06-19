import { Router, Request, Response } from "express";
import { requireApiKey } from "../../middleware/auth";
import { contract } from "../../utils/setup";

const router = Router();


router.get("/:name", requireApiKey, async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const address = await contract.resolve(name);
    res.json({ name, address });
  } catch (err) {
    res.status(404).json({ error: "Name not registered or expired" });
  }
});

export { router };
