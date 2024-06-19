
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userModel from "../models/userModel.mjs";

export default async function AuthMiddleware(req, res, next) {
  try {
    // Checking if token is provided in the Authorization header
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).json("Unauthorized access");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json("Unauthorized access");
    }

    // Checking if the token is valid
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(401).json("Unauthorized access");
    }

    // Checking if user is valid
    const user = await userModel.getUserById(payload.user.id);
    if (!user) {
      throw new Error("User no longer exists");
    }

    // Providing user for the next in the pipeline
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json("Unauthorized access");
  }
}