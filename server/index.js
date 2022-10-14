import express from "express";
import * as dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from './routes/chatRoutes.js'
import color from "colors";
import { errorHandle, notFound } from "./middlewares/errorMiddleware.js";
dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/chat",chatRoutes)
app.use(notFound);
app.use(errorHandle);
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is started on port ${port} `.yellow.bold));
