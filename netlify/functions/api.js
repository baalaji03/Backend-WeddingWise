import express, { Router } from "express";
import serverless from "serverless-http";
import authRoute from "../../Routes/authRouter.js";
import connectDB from "../../Database/config.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const api = express();

api.use(
  cors({
    origin: "*", // Your Netlify frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

api.use(express.json());

api.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

connectDB();

const router = Router();

router.get("/", (_, res) => {
  res.send("Welcome to API");
});

api.use("/api/", router);
api.use("/api/auth/", authRoute);
  

export const handler = serverless(api);
