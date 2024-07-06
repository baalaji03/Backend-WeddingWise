// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

// netlify/functions/auth.js
exports.handler = async (event, context) => {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "https://wedding-event-frontend.netlify.app",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
        body: JSON.stringify({ message: "CORS preflight response" }),
      };
    }
  
    try {
      const { name, email, profilePic } = JSON.parse(event.body);
      // Handle the request...
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "https://wedding-event-frontend.netlify.app",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
        body: JSON.stringify({ message: "User authenticated" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "https://wedding-event-frontend.netlify.app",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
        body: JSON.stringify({ error: error.message }),
      };
    }
  };
  

export const handler = serverless(api);
