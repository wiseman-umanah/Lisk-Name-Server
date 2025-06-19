import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import appRoutes from "./routes/v1/index";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/v1", appRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`LNS API is running on http://localhost:${PORT}/api/v1`);
});
