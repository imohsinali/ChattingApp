import express from "express";
import chats from "./data/data.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();

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
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is started on port ${port} `));
