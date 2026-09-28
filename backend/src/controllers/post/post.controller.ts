import { Router, type Request, type Response } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { uploadImage } from "../../lib/storage";

import { GetPostStatsUseCase } from "../../usecases/post/get-post-stats-usecase";
import { GetAdminPostUseCase } from "../../usecases/post/get-admin-post-usecase";
import { GetSliderOrHighlightPostsUseCase } from "../../usecases/post/get-slider-highlight-post-usecase";
import { GetAllFrontPostsPostUseCase } from "../../usecases/post/get-all-front-posts-usecase";
import { UpdatePostChangeStatusUseCase } from "../../usecases/post/update-post-change-status-usecase";
import { GetPostByIdUseCase } from "../../usecases/post/get-post-by-id-usecase";
import { UpsertPostUseCase } from "../../usecases/post/upsert-post-usecase";
import { DeletePostUseCase } from "../../usecases/post/delete-post-usecase";
import { getSlidesPresenter } from "./presenters/get-slide-presenters";
import { getHighlightPostsPresenter } from "./presenters/get-highlight-presenters";
import { validateBody } from "../../middlewares/body-validator";
import { upsertPostSchema } from "./dtos/upsert-post.dto";
import { SlidesOrHighlightPosts } from "../../entities/post/types/post-slides-or-highlightPosts";
import { PostField } from "../../entities/post/types/post-field";
import { UserEntity } from "../../entities/user/user-entity";
import { PostEntity } from "../../entities/post/post-entity";

const router = Router();

router.get("/stats", authenticate, async (req: Request, res: Response) => {
  const { user } = req;

  const getPostStatsUseCase = new GetPostStatsUseCase();
  const getStats = await getPostStatsUseCase.execute(user!);

  return res.json(getStats);
});

router.get("/admin", authenticate, async (req: Request, res: Response) => {
  const { user, query } = req;
  const { q, page, limit, categoryId, authorId, type } = query;
  const pagination = {
    page: Number(page),
    limit: Number(limit),
  };
  const filters = {
    q: q ? String(q) : undefined,
    categoryId: categoryId ? Number(categoryId) : undefined,
    authorId: authorId ? Number(authorId) : undefined,
    type: type ? String(type) : undefined,
  };
  const getAdminPostsUseCase = new GetAdminPostUseCase();
  const postsWithPagination = await getAdminPostsUseCase.execute(
    user!,
    pagination,
    filters,
    "admin",
  );
  return res.json(postsWithPagination);
});

router.get("/pending", authenticate, async (req: Request, res: Response) => {
  const { user, query } = req;
  const { q, page, limit, categoryId, authorId, type } = query;
  const pagination = {
    page: Number(page),
    limit: Number(limit),
  };
  const filters = {
    q: q ? String(q) : undefined,
    categoryId: categoryId ? Number(categoryId) : undefined,
    authorId: authorId ? Number(authorId) : undefined,
    type: type ? String(type) : undefined,
  };
  const getAdminPostsUseCase = new GetAdminPostUseCase();
  const postsWithPagination = await getAdminPostsUseCase.execute(
    user!,
    pagination,
    filters,
    "pending",
  );
  return res.json(postsWithPagination);
});

router.get("/allSlides", async (req: Request, res: Response) => {
  const getSliderPostUseCase = new GetSliderOrHighlightPostsUseCase();
  const getSlidesPost = await getSliderPostUseCase.execute(SlidesOrHighlightPosts.SLIDE);
  const presenter = getSlidesPost.map((i) => {
    return getSlidesPresenter(i.title!, i.thumbnail!, i.slug!);
  });
  return res.json(presenter);
});

router.get("/highlightPosts", async (req: Request, res: Response) => {
  const getHighlightPostsPostUseCase = new GetSliderOrHighlightPostsUseCase();
  const getHighlightPosts = await getHighlightPostsPostUseCase.execute(
    SlidesOrHighlightPosts.HIGHLIGHT,
  );
  const presenter = getHighlightPosts.map((i) => {
    return getHighlightPostsPresenter(i.title!, i.thumbnail!, i.slug!);
  });
  return res.json(presenter);
});

router.get("/allPosts", async (req: Request, res: Response) => {
  const getAllFrontPostsUseCase = new GetAllFrontPostsPostUseCase();
  const getAllFrontPosts = await getAllFrontPostsUseCase.execute();
  return res.json(getAllFrontPosts);
});

router.get("/:id", authenticate, async (req: Request, res: Response) => {
  const { user } = req;

  const { id } = req.params;
  const getPostByIdUseCase = new GetPostByIdUseCase();
  const getPostById = await getPostByIdUseCase.execute(user!, Number(id));
  return res.json(getPostById);
});

router.post(
  "/createpost",
  authenticate,
  uploadImage.single("thumbnail"),
  validateBody(upsertPostSchema),
  async (req: Request, res: Response) => {
    const { user } = req;

    const {
      id,
      title,
      content,
      categoryId,
      scheduledAt,
      thumbnailUrl,
      slide,
      highlight,
      published,
      action,
    } = req.body;

    const isSlide = slide === "true" || slide === true;
    const isHighlight = highlight === "true" || highlight === true;
    const thumbnail = req.file ? `/images/${req.file.filename}` : thumbnailUrl || null;

    const PostContent = {
      id,
      title,
      content,
      categoryId,
      scheduledAt,
      thumbnail,
      published,
      slide: isSlide,
      highlight: isHighlight,
      authorId: user!.id!,
    };

    const createUpdatePost = new UpsertPostUseCase();
    const upsertPost = await createUpdatePost.execute(user!, PostContent, action);

    return res.json(upsertPost);
  },
);

router.put(
  "/:id",
  authenticate,
  uploadImage.single("thumbnail"),
  // validateBody(upsertPostSchema),
  async (req: Request, res: Response) => {
    const { user } = req;

    const { action, ...rest } = req.body;
    const postContent = { ...rest } as PostEntity;
    console.log("postContent controller highlight: ", postContent.highlight);
    console.log("postContent controller slide: ", postContent.slide);

    const createUpdatePost = new UpsertPostUseCase();
    const upsertPost = await createUpdatePost.execute(user!, postContent, action);

    return res.json(upsertPost);
  },
);

router.patch("/:id/changeStatus", authenticate, async (req: Request, res: Response) => {
  const { status, field } = req.body;
  const { id } = req.params;
  const postId = Number(id);

  const updatePostStatusUsecase = new UpdatePostChangeStatusUseCase();
  const updatePost = await updatePostStatusUsecase.execute({
    id: postId,
    field: field as PostField,
    status,
  });
  return res.json(updatePost);
});

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const deletePostUseCase = new DeletePostUseCase();
  const deletePost = await deletePostUseCase.execute(Number(req.params.id));
  res.json(deletePost);
});

export default router;
