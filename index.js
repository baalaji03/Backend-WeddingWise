import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import authRoute from "./Routes/authRouter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://wedding-event-frontend.netlify.app/",
    Credentials: true,
  })
);

app.use(express.json());

//error handler

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || `Internal Server Error`;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to api");
});
//API Routes
app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port `);
});
