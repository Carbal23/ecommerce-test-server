import { check, validationResult } from "express-validator";

export const validateNewUser = [
  check("name", "Nombre no valido").not().isEmpty(),
  check("email", "Email no valido").isEmail(),
  check("password", "Debe ser de almenos 6 caracteres").isLength({ min: 6 }),

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
