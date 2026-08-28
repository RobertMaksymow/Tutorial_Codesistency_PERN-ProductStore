import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env; // Destructure from environment variables

const clientSQL = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`,
); // Create a new Neon client instance

export default clientSQL; // Export the client for use in other parts of the application
