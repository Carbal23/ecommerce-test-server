import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";

configDotenv({path: 'variables.env'})

const authMiddleware = (req, res, next)=>{
    const authHeader = req.get("Authorization");

  if (!authHeader) {
    console.log("No existe token authorization");
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRETA);
    req.user = user;
    return next()

  } catch (error) {
    console.log("token no valido");
    return next();
  }
}

export default authMiddleware;