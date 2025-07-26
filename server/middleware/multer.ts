import multer from 'multer';
import storage from '../db/gridfs';

const upload = multer({ storage });

export { upload };