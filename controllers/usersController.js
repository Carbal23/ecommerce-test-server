import User from "../models/User.js";
import bcrypt from "bcrypt";

export const newUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let userExistingByEmail = await User.findOne({ email });

    if (userExistingByEmail) {
      const error = new Error("El usuario ya existe");
      error.statusCode = 409;
      throw error;
    }

    const newUser = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    return res.json({ success: true, message: "Usuario creado correctamente" });
  } catch (error) {
    next(error);
  }
};
