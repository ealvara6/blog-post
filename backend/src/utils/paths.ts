import path from 'path';

export const UPLOAD_DIR = path.join(
  __dirname,
  '..',
  '..',
  'public',
  'uploads',
  'profile-pictures',
  'thumbs'
);

export const publicUrlToAbsolutePath = (publicUrl: string) => {
  return path.join(__dirname, '..', '..', 'public', publicUrl);
};
