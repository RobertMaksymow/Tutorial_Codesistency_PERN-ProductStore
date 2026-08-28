import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import sql from "./config/db.js"; // Import the database client

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

app.use("/api_v1/products", productRoutes); // Mount the product routes at /api/products

async function initDBConnection() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`; // Create the products table if it doesn't exist

    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

initDBConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
});
