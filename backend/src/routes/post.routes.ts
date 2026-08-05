import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  getPosts,
  getPostById,
  createUpdatePost,
  deletePost,
  uploadEditorImage,
  uploadEditorAudio,
  getImages,
  deleteImage,
  updatePostStatus,
  updatePostSlide,
  updatePostHighlight,
  slidersPosts,
  allPosts,
  highlightPosts
} from "../controllers/post.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Configuração do Multer para upload local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images"));

  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Configuração do Multer para upload de áudio
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

const uploadAudio = multer({ storage: audioStorage });

router.get("/", authenticate, getPosts);
router.get("/allSlides", slidersPosts);
router.get("/highlightPosts", highlightPosts);
router.get("/allPosts", allPosts);
router.get("/images", authenticate, getImages);
router.get("/:id", authenticate, getPostById);
router.post(
  "/uploadImage",
  authenticate,
  upload.single("image"),
  uploadEditorImage,
);
router.post(
  "/upload-audio",
  authenticate,
  uploadAudio.single("audio"),
  uploadEditorAudio,
);
router.post(
  "/createpost",
  authenticate,
  upload.single("thumbnail"),
  createUpdatePost,
);
router.put("/:id", authenticate, upload.single("thumbnail"), createUpdatePost);
router.patch("/:id/status", authenticate, updatePostStatus);
router.patch("/:id/slide", authenticate, updatePostSlide);
router.patch("/:id/highlight", authenticate, updatePostHighlight);
router.delete("/images/:filename", authenticate, deleteImage);
router.delete("/:id", authenticate, deletePost);

export default router;
