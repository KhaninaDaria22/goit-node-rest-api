import mongoose from "mongoose";
import 'dotenv/config'


const DB_URL = process.env.DB_URL 
mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connection successfully"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });













