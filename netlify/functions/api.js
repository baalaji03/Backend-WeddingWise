import express, { Router } from "express";
import serverless from "serverless-http";
import authRoute from "../../Routes/authRouter.js";
import connectDB from "../../Database/config.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Logging middleware to check requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// CORS middleware
app.use(
  cors({
    origin: "https://wedding-event-frontend.netlify.app", // Your Netlify frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Test logging to ensure CORS middleware runs
app.use((req, res, next) => {
  console.log('CORS middleware applied');
  next();
});

app.use(express.json());

// Error handler
app.use((err, req, res, next) => {
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

app.use("/api/", router);
app.use("/api/auth/", authRoute);

export const handler = serverless(app);
