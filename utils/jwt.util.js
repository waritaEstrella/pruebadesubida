import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

// Decodifica JWT sin verificar, útil solo para obtener datos del front (no para proteger rutas)
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (e) {
    return null;
  }
};
