import { Router } from "express";
import { router as resolveRouter } from "./resolve";
import { router as apiKeyRouter } from "./apiKey";

const router = Router();

router.use("/resolve", resolveRouter);      
router.use("/generate-api-key", apiKeyRouter);

export default router;
