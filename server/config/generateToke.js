import jwt from "jsonwebtoken";

const generateToken = (id) => {
  console.log(id);
  const token = jwt.sign({ id }, process.env.JWT_S, {
    expiresIn: "30d",
  });
return token
}

export default generateToken;
