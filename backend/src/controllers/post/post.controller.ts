import { Router, type Request, type Response } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { GetPostStatsUseCase } from "../../usecases/post/get-post-stats-usecase";
import { GetPostUseCase } from "../../usecases/post/get-post-usecase";
import { SliderPostUseCase } from "../../usecases/post/slider-post-usecase";
import { HighlightPostsPostUseCase } from "../../usecases/post/highlight-post-usecase";
import { AllPostsPostUseCase } from "../../usecases/post/all-posts-usecase";
import { GetPostByIdUseCase } from "../../usecases/post/get-post-by-id-usecase";
import { UpsertPostUseCase } from "../../usecases/post/upsert-post-usecase";
import { UpdatePostChangeStatusUseCase,  } from "../../usecases/post/update-post-change-status-usecase";
import { DeletePostUseCase } from "../../usecases/post/delete-post-usecase";
import { uploadImage } from "../../lib/storage";

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
  console.log("first")
  const getPostById = new GetPostByIdUseCase();
  const result = await getPostById.execute(req);
  res.json(result);
});

router.post(
  "/createpost",
  authenticate,
  uploadImage.single("thumbnail"),
  async (req: Request, res: Response) => {
    try {
      const createUpdatePost = new UpsertPostUseCase();
      const result = await createUpdatePost.execute(req);
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao criar post";
      res.status(400).json({ message });
    }
  },
);

router.put(
  "/:id",
  authenticate,
  uploadImage.single("thumbnail"),
  async (req: Request, res: Response) => {
    try {
      const createUpdatePost = new UpsertPostUseCase();
      const result = await createUpdatePost.execute(req);
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao atualizar post";
      res.status(400).json({ message });
    }
  },
);

router.patch("/:id/changeStatus", authenticate, async (req: Request, res: Response) => {
  const updatePostStatus = new UpdatePostChangeStatusUseCase();
  const result = await updatePostStatus.execute(req);
  res.json(result);
});

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const deletePost = new DeletePostUseCase();
  const result = await deletePost.execute(req);
  res.json(result);
});

export default router;
