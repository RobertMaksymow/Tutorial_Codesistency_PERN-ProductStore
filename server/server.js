import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(helmet()); // Security middleware to set various HTTP headers for security
app.use(morgan("dev")); // Logging middleware to log HTTP requests

app.get("/", (req, res) => {
  res.send("Hello World from the ROOT route!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
