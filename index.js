import express from "express";
import dbConecction from "./config/db.js";
import cors from "cors";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import prodcutRouter from "./routes/product.js";
import imagesRouter from "./routes/images.js";
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from "./middlewares/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConecction();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
}
app.use( cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', prodcutRouter);
app.use('/api/images', imagesRouter)

app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
