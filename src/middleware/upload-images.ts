import multer from 'multer';
import path from 'path';

const imageStorage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname));
  }
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) return cb(new Error('Please, send only jpg or png images'));
    cb(null, true);
  }
});

export { imageUpload };