import asyncHandler from "express-async-handler";
import generateToken from "../config/generateToke.js";
import User from "../models/userModel.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = await req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExit = await User.findOne({ email: email });
  if (userExit) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._d),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create The User");
  }
});

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = await req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._d),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or password");
  }
});

//api/users?search=mohsin this is called query
export const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          {
            name: { $regex: req.query.search, $options: "i" },
            email: { $regex: req.query.search, $options: "i" },
          },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};
