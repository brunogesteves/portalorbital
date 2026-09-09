import { type Request, type Response, Router } from "express";

import { authenticate } from "../middlewares/auth.middleware";
import { DeleteImageUseCase } from "../usecases/images/delete-image-usecase";
import { UploadEditorImageUseCase } from "../usecases/images/upload-editor-image-usecase";
import { AllImagesPostUseCase } from "../usecases/images/all-images-usecase";
import { GetImagesInUseUseCase } from "../usecases/images/get-images-in-use-usecase";
import { uploadImage } from "../lib/storage";

const router = Router();

router.get("/", authenticate, async (req: Request, res: Response) => {
  const allImages = new AllImagesPostUseCase();
  const result = await allImages.execute();
  res.json(result);
});

router.get("/in-use", authenticate, async (req: Request, res: Response) => {
  const getImagesInUse = new GetImagesInUseUseCase();
  const result = await getImagesInUse.execute();
  res.json(result);
});

router.post(
  "/uploadImage",
  authenticate,
  uploadImage.single("image"),
  async (req: Request, res: Response) => {
    const UploadEditor = new UploadEditorImageUseCase();
    const result = await UploadEditor.execute(req);
    res.json(result);
  },
);

router.delete("/:filename", authenticate, async (req: Request, res: Response) => {
  const deleteImage = new DeleteImageUseCase();
  const result = await deleteImage.execute(req);
  res.json(result);
});
export default router;
