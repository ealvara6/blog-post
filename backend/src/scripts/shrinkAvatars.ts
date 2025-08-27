import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = 'public/uploads/profile-pictures';
const outDir = 'public/uploads/profile-pictures/thumbs';

fs.mkdirSync(outDir, { recursive: true });

for (const file of fs.readdirSync(srcDir)) {
  const inPath = path.join(srcDir, file);
  const stat = fs.statSync(inPath);
  if (!stat.isFile()) continue;

  const base = path.parse(file).name; // e.g., "user-1"
  const outPath = path.join(outDir, `${base}.webp`);

  sharp(inPath)
    .rotate()
    .resize(128, 128, { fit: 'cover' }) // square thumbnail
    .webp({ quality: 80 })
    .toFile(outPath);

  console.log('Wrote', outPath);
}
