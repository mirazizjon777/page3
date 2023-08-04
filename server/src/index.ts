import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/page.routes";
import pageModel from "./models/page.model";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "30mb" }));

app.use("/page", router);

const port = process.env.PORT || 2020;

async function runServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    //
    app.listen(port, () => {
      console.log(`Your server is running on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

runServer();

// const on = async () => {
//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await res.json();
//     pageModel.create(data);
//   } catch (error) {}
// };

// on();
