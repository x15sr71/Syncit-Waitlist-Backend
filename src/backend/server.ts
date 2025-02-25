import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import fs from "fs";
import https from "https";
import zod from "zod";  

const app = express();

// Use the cors middleware with environment variable or default settings
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // For production, set this to "https://syncit.org.in"
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

const emailSchema = zod.string().email();

// Manual middleware to ensure CORS headers are in all responses
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample API endpoint
app.post("/api/waitlist", (req: Request, res: Response) => {
  const email = emailSchema.parse(req.body.email);
  console.log(`Received waitlist request for email: ${email}`);
  res.json({ message: "Waitlist request received" });
});

// Read SSL certificate and key from two directories up or from env variables
const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH || "../../origin-key.pem"),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH || "../../origin-cert.pem"),
};

const PORT = process.env.PORT || 4000;

// Create an HTTPS server with the SSL options and our Express app
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});
