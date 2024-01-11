import dotenv from "dotenv";
import connectDB from "../db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    console.log("Database Connected");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection Failed ", err);
  });
