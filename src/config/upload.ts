import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: uploadsFolder,
    storage: multer.diskStorage({
        destination: uploadsFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;

            return callback(null, filename);
        }
    }),
};