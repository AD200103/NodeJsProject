import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./src/route/user.js";
import fighterRouter from "./src/route/fighter.js";
const app = express();
app.use(cors());
app.use(express.json());
//============================================================
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Bad connection!"));
app.use(userRouter);
app.use(fighterRouter);
//============================================================
app.use((req, res) => {
  return res.status(404).json("No such endpoint exists!");
});
app.listen(process.env.PORT, () => {
  console.log(`Successfully connected to port: ${process.env.PORT}!`);
});
