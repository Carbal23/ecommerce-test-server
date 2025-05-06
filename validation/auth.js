import { check, validationResult } from "express-validator";

export const validateAuthUser = [
  check("email", "Email no valido").isEmail(),
  check("password", "password no valido").not().isEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Error en los datos del formulario");
      error.statusCode = 400;
      error.details = errors.array();
      throw error;
    }
    next();
  },
];
