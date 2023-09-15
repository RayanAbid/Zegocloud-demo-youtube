import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "dotenv";
import userRouter from "./routes/User.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Now listening on port ${port}`);
    });

    app.get("/", (req, res) => {
      //   res.sendFile("index.html", { root: "./" });
      // res.sendFile("index.html");
      res.send(`🚀 Fitness World 🚀 `);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });

app.use("/", userRouter);
