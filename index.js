import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import authRoute from "./Routes/authRouter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://wedding-event-frontend.netlify.app", // Your Netlify frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Welcome to API");
});

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
