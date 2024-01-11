import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// handle json file
app.use(express.json({ limit: "20kb" }));
// handle url type
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
// handle assests
app.use(express.static("public"));
// perform CRUD operation on cookies
app.use(cookieParser());

export { app };
