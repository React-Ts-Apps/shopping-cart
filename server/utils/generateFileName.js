import path from 'path';

export function generateFileName(file) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    return `${base}-${uniqueSuffix}${ext}`
}