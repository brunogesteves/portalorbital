import { Router, type Request, type Response } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { GetPostStatsUseCase } from "../../usecases/post/get-post-stats-usecase";
import { GetPostUseCase } from "../../usecases/post/get-post-usecase";
import { SliderPostUseCase } from "../../usecases/post/slider-post-usecase";
import { HighlightPostsPostUseCase } from "../../usecases/post/highlight-post-usecase";
import { AllPostsPostUseCase } from "../../usecases/post/all-posts-usecase";
import { GetPostByIdUseCase } from "../../usecases/post/get-post-by-id-usecase";
import { UpsertPostUseCase } from "../../usecases/post/upsert-post-usecase";
import { uploadImage } from "../../lib/storage";
import { GetStatsPresenter } from "./presenters/getStats.presenter";
import { GetPostsPresenter } from "./presenters/get-post-presenter";
import { PostContentPresenter } from "./presenters/post-presenters";
import { UpsertPostPresenter } from "./presenters/upsert-post-presenters";
import { UpdatePostChangeStatusUseCase } from "../../usecases/post/update-post-change-status-usecase";
import { DeletePostUseCase } from "../../usecases/post/delete-post-usecase";

const router = Router();

router.get("/stats", authenticate, async (req: Request, res: Response) => {
  const getPostStatsUseCase = new GetPostStatsUseCase();
  const getStats = await getPostStatsUseCase.execute(req);
  const presenter = new GetStatsPresenter({
    totalPosts: getStats.totalPosts,
    totalHighlights: getStats.totalHighlights,
    totalActivePosts: getStats.totalActivePosts,
    totalSlides: getStats.totalSlides,
  });
  return res.json(presenter);
});

router.get("/", authenticate, async (req: Request, res: Response) => {
  const getPostsUseCase = new GetPostUseCase();
  const getPosts = await getPostsUseCase.execute(req);
  const presenter = new GetPostsPresenter(getPosts.posts, getPosts.pagination);
  return res.json(presenter);
});

router.get("/allSlides", async (res: Response) => {
  const sliderPostUseCase = new SliderPostUseCase();
  return await sliderPostUseCase.execute();
});

router.get("/highlightPosts", async (res: Response) => {
  const highlightPostsPostUseCase = new HighlightPostsPostUseCase();
  return await highlightPostsPostUseCase.execute();
});

router.get("/allPosts", async (res: Response) => {
  const allPosts = new AllPostsPostUseCase();
  return await allPosts.execute();
});

router.get("/:id", authenticate, async (req: Request, res: Response) => {
  const getPostByIdUseCase = new GetPostByIdUseCase();
  const getPostById = await getPostByIdUseCase.execute(Number(req.params.id), req);
  const presenter = new PostContentPresenter(getPostById);
  return res.json(presenter);
});

router.post(
  "/createpost",
  authenticate,
  uploadImage.single("thumbnail"),
  async (req: Request, res: Response) => {
    const createUpdatePost = new UpsertPostUseCase();
    const upsertPost = await createUpdatePost.execute(req);
    const presenter = new UpsertPostPresenter(upsertPost);
    return res.json(presenter);
  },
);

router.put(
  "/:id",
  authenticate,
  uploadImage.single("thumbnail"),
  async (req: Request, res: Response) => {
    const createUpdatePost = new UpsertPostUseCase();
    const upsertPost = await createUpdatePost.execute(req);
    const presenter = new UpsertPostPresenter(upsertPost);
    return res.json(presenter);
  },
);

router.patch("/:id/changeStatus", authenticate, async (req: Request, res: Response) => {
  const updatePostStatus = new UpdatePostChangeStatusUseCase();
  return await updatePostStatus.execute(req);
});

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const deletePostUseCase = new DeletePostUseCase();
  const presenter = await deletePostUseCase.execute(Number(req.params.id));
  res.json(presenter);
});

export default router;
