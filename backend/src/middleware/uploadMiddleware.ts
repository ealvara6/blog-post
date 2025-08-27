import fs from 'fs';
import { UPLOAD_DIR } from '../utils/paths';
import multer from 'multer';
import path from 'path';

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const userId = req.user?.id;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `user-${userId}-${Date.now()}${ext}`);
  },
});

const ALLOWED_MIME = new Set(['image/png', 'image/jpeg', 'image/webp']);

export const avatarUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error(' Only PNG or JPEG images are allowed'));
    }
    cb(null, true);
  },
});
