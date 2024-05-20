import mongoose from "mongoose";
import 'dotenv/config'
import {app} from "./app.js"


const {DB_URL, PORT = 4000} = process.env; 

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });













