import { type Request, type Response, Router } from "express";

import { uploadAudio } from "../lib/storage";
import { UploadEditorAudioUseCase } from "../usecases/post/upload-editor-audio-usecase";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/upload-audio",
  authenticate,
  uploadAudio.single("audio"),
  async (req: Request, res: Response) => {
    const UploadEditor = new UploadEditorAudioUseCase();
    const getAudioUrl = await UploadEditor.execute(req.file!);
    res.json(getAudioUrl);
  },
);

// router.get("/audio/:id", async (req: Request, res: Response) => {
//   const UploadEditor = new UploadEditorAudioUseCase();
//   const result = await UploadEditor.execute(id: Number(req.params.id), file: req.file);
//   res.json(result);
// });

export default router;
