import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Configuración del almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'perfiles_usuarios', // nombre de la carpeta en Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 400, height: 400, crop: 'limit' }],
  },
});

// Middleware Multer con almacenamiento Cloudinary
const upload = multer({ storage });

export default upload;
