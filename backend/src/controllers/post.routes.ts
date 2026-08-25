
import { Router, type Request, type Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authenticate } from "../middlewares/auth.middleware";
import { GetPostStatsUseCase } from "../usecases/post/get-post-stats-usecase";
import { GetPostUseCase } from "../usecases/post/get-post-usecase";
import { SliderPostUseCase } from "../usecases/post/slider-post-usecase";
import { HighlightPostsPostUseCase } from "../usecases/post/highlight-post-usecase";
import { AllPostsPostUseCase } from "../usecases/post/all-posts-usecase";
import { AllImagesPostUseCase } from "../usecases/post/all-images-usecase";
import { GetPostByIdUseCase } from "../usecases/post/get-post-byid-usecase";

const router = Router();

// Configuração do Multer para upload local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
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

router.get("/stats", authenticate, async (req: Request, res: Response) => {
  const getStats = new GetPostStatsUseCase();
  const result = await getStats.execute(req);
  res.json(result);
});

router.get("/", authenticate, async (req: Request, res: Response) => {
  const getPosts = new GetPostUseCase();
  const result = await getPosts.execute(req);
  res.json(result);
});

router.get("/allSlides", async (res: Response) => {
  const getPosts = new SliderPostUseCase();
  const result = await getPosts.execute();
  res.json(result);
});

router.get("/highlightPosts", async (res: Response) => {
  const getPosts = new HighlightPostsPostUseCase();
  const result = await getPosts.execute();
  res.json(result);
});

router.get("/allPosts", async (res: Response) => {
  const allPosts = new AllPostsPostUseCase();
  const result = await allPosts.execute();
  res.json(result);
});

router.get("/images", authenticate, async (res: Response) => {
  const allImages = new AllImagesPostUseCase();
  const result = await allImages.execute();
  res.json(result);
});

router.get("/:id", authenticate, async (req: Request, res: Response) => {
  const getPostById = new GetPostByIdUseCase();
  const result = await getPostById.execute(req);
  res.json(result);
});

router.post("/uploadImage", authenticate, upload.single("image"), uploadEditorImage);
router.post("/upload-audio", authenticate, uploadAudio.single("audio"), uploadEditorAudio);
router.post("/createpost", authenticate, upload.single("thumbnail"), createUpdatePost);
router.put("/:id", authenticate, upload.single("thumbnail"), createUpdatePost);
router.patch("/:id/status", authenticate, updatePostStatus);
router.patch("/:id/slide", authenticate, updatePostSlide);
router.patch("/:id/highlight", authenticate, updatePostHighlight);
router.delete("/images/:filename", authenticate, deleteImage);
router.delete("/:id", authenticate, deletePost);

export default router;
