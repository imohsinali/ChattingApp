import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  let decode;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      decode = jwt.verify(token, process.env.JWT_S);
      req.user = await User.findById(decode.id).select("-password");
      console.log("Mohsin");
      next();
    } catch (e) {
      console.log(
        jwt.verify(
          "zeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM2MTUwMDEsImV4cCI6MTY2NjIwNzAwMX0.o4NEmOVqmyb9Wb_Bj3U4TcqaKERrd1dOmBohUgG7C8A",
          process.env.JWT_S
        )
      );
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});
