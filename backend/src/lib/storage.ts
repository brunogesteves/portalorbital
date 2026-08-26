import multer from "multer";
import path from "node:path";
import fs from "fs"

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

export const uploadImage = multer({ storage: imageStorage });



const audioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/audio"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext);
        let filename = base + ext;
        const dir = path.join(__dirname, "../../public/audio");
        let counter = 1;
        while (fs.existsSync(path.join(dir, filename))) {
            filename = `${base}-(${counter})${ext}`;
            counter++;
        }
        cb(null, filename);
    },
});

export const uploadAudio = multer({ storage: audioStorage });