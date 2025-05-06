import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import cloudinaryConfig from '../config/cloudinary.js';

// Configuración de multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadImagesToCloudinary = [
  upload.array('images', 3),    // Limitar a 3 imágenes
  async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        const error = new Error('No se enviaron imágenes');
        error.statusCode = 400;
        return next(error);
      }

      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'productos' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );

          const readable = new Readable();
          readable._read = () => {};
          readable.push(file.buffer);
          readable.push(null);
          readable.pipe(stream);
        });
      });

      const imageUrls = await Promise.all(uploadPromises);

      res.json({ success: true, images: imageUrls });
    } catch (error) {
      next(error);
    }
  },
];
