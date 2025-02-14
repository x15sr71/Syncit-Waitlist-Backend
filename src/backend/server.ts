import "dotenv/config";
import express, { Request, Response, Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { z } from "zod";

const app: Application = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define Mongoose schema and model
const EmailSchema = new mongoose.Schema({ email: String });
const Email = mongoose.model("Email", EmailSchema);

// Zod schema for email validation
const emailSchema = z.string().email();

// POST route handler (fixed return type)
app.post("/api/waitlist", async (req: Request, res: Response) => {
  const { email } = req.body;
  const validation = emailSchema.safeParse(email);

  if (!validation.success) {
    console.log("Invalid email");
    res.status(400).json({ message: "Invalid email" });
    return; // Explicit return after sending response
  }

  try {
    const response = await Email.create({ email });
    console.log(response);
    res.json({ message: "You've been added to the waitlist!" });
  } catch (err) {
    console.error("MongoDB error:", err);
    res.json({ message: "You're on the waitlist (queued)!" });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));