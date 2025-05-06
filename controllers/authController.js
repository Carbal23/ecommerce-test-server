import User from "../models/User.js";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv({ path: "variables.env" });

export const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("-__v");

    if (!user) {
      const error = new Error("Usuario no existe");
      error.statusCode = 404;
      throw error;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      const error = new Error("Contraseña incorrecta");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRETA,
      {
        expiresIn: "8h",
      }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.json({ success: true, token, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export const getAuthenticatedUser = async (req, res, next) => {
  const { email } = req.user;

  if (!email) {
    return;
  }

  try {
    const user = await User.findOne({ email }).select("-__v");

    if (!user) {
      const error = new Error("Usuario no existe");
      error.statusCode = 404;
      throw error;
    }
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};
