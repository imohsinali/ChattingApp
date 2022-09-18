import express from "express";
import chats from "./data/data.js";
import * as dotenv from "dotenv";
import connectDb from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import { errorHandle, notFound } from "./middlewares/errorMiddleware.js";
dotenv.config();
connectDb();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello word");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  //   console.log(req.params.id);
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  //   console.warn(singleChat);
  res.send(singleChat);
});
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandle);
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is started on port ${port} `.yellow.bold));
