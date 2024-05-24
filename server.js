import mongoose from "mongoose";
import 'dotenv/config'
import {app} from "./app.js"



mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.error(error);и
    process.exit(1);
  });













