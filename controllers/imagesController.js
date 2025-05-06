import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import shortid from "shortid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads/images");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${shortid.generate()}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      cb(null, true);
    } else {
      cb(
        new Error("Solo se permiten archivos de imagen (jpeg, jpg, png, webp)")
      );
    }
  },
});

export const uploadImages = (req, res, next) => {
  const uploader = upload.array("images", 5);

  uploader(req, res, function (err) {
    if (err) {
      const error = new Error(err.message || "Error al procesar el archivo");
      error.statusCode = 400;
      return next(error);
    }

    if (!req.files || req.files.length === 0) {
      const error = new Error("No se enviaron imágenes");
      error.statusCode = 400;
      return next(error);
    }

    try {
      const filenames = req.files.map((file) => file.filename);
      res.json({ success: true, images: filenames });
    } catch (error) {
      next(error);
    }
  });
};
