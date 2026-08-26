import { Router, type Request, type Response } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { GetPostStatsUseCase } from "../usecases/post/get-post-stats-usecase";
import { GetPostUseCase } from "../usecases/post/get-post-usecase";
import { SliderPostUseCase } from "../usecases/post/slider-post-usecase";
import { HighlightPostsPostUseCase } from "../usecases/post/highlight-post-usecase";
import { AllPostsPostUseCase } from "../usecases/post/all-posts-usecase";

import { GetPostByIdUseCase } from "../usecases/post/get-post-byid-usecase";

import { CreateUpdatePostUseCase } from "../usecases/post/create-update-post-usecase";
import { UpdatePostStatusUseCase } from "../usecases/post/update-post-status-usecase";
import { UpdatePostSlideUseCase } from "../usecases/post/update-post-slide-usecase";
import { UpdatePostHighlightUseCase } from "../usecases/post/update-post-highlight-usecase";
import { DeletePostUseCase } from "../usecases/post/delete-post-usecase";
import { uploadImage } from "../lib/storage";

const router = Router();

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

router.get("/allSlides", async (req: Request, res: Response) => {
  const getPosts = new SliderPostUseCase();
  const result = await getPosts.execute();
  res.json(result);
});

router.get("/highlightPosts", async (req: Request, res: Response) => {
  const getPosts = new HighlightPostsPostUseCase();
  const result = await getPosts.execute();
  res.json(result);
});

router.get("/allPosts", async (req: Request, res: Response) => {
  const allPosts = new AllPostsPostUseCase();
  const result = await allPosts.execute();
  res.json(result);
});

router.get("/:id", authenticate, async (req: Request, res: Response) => {
  const getPostById = new GetPostByIdUseCase();
  const result = await getPostById.execute(req);
  res.json(result);
});

router.post(
  "/createpost",
  authenticate,
  uploadImage.single("thumbnail"),
  async (req: Request, res: Response) => {
    const createUpdatePost = new CreateUpdatePostUseCase();
    const result = await createUpdatePost.execute(req);
    res.json(result);
  },
);

router.put(
  "/:id",
  authenticate,
  uploadImage.single("thumbnail"),
  async (req: Request, res: Response) => {
    const createUpdatePost = new CreateUpdatePostUseCase();
    const result = await createUpdatePost.execute(req);
    res.json(result);
  },
);

router.patch("/:id/status", authenticate, async (req: Request, res: Response) => {
  const updatePostStatus = new UpdatePostStatusUseCase();
  const result = await updatePostStatus.execute(req);
  res.json(result);
});

router.patch("/:id/slide", authenticate, async (req: Request, res: Response) => {
  const updatePostSlide = new UpdatePostSlideUseCase();
  const result = await updatePostSlide.execute(req);
  res.json(result);
});

router.patch("/:id/highlight", authenticate, async (req: Request, res: Response) => {
  const updatePostSlide = new UpdatePostHighlightUseCase();
  const result = await updatePostSlide.execute(req);
  res.json(result);
});

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const deletePost = new DeletePostUseCase();
  const result = await deletePost.execute(req);
  res.json(result);
});

export default router;
