import { check, validationResult } from "express-validator";

export const validateNewProduct = [
  check("title", "El título es requerido").not().isEmpty(),
  check("description", "La descripción es requerida").not().isEmpty(),
  check("price", "El precio debe ser un número").isFloat({ gt: 0 }),
  check("brand", "La marca es requerida").not().isEmpty(),
  check("stock", "El stock debe ser un número entero").isInt({ min: 0 }),
  check("category", "La categoría es requerida").not().isEmpty(),
  check("images")
    .optional() 
    .isArray({ min: 1 })
    .withMessage("Images debe ser un array con al menos una imagen"),
  check("images.*")
    .optional()
    .isString()
    .withMessage("Cada imagen debe ser un string"),

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

export const validateRateProduct = [
  check("rating", "El rating debe ser un número entero").isInt({ min: 0 }),

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
