import { type Request, type Response, Router } from "express";
import { SearchTermUseCase } from "../../usecases/search/searchTerm-usecase";
import { SearchSlugCategoryNewsUseCase } from "../../usecases/search/search-slug-category-news-usecase";
import { PostContentPresenter } from "../post/presenters/post-presenters";
import { SearchSlugPresenter } from "./presenters/search-slug-presenter";
import { GetCategoryContentPresenter } from "../category/presenters/get-category-content-presenters";

const router = Router();

router.get("/searchcontent/:term", async (req: Request, res: Response) => {
  const searchTermUseCase = new SearchTermUseCase();
  const searchTerm = await searchTermUseCase.execute(req.params.term as string);
  const presenter = new PostContentPresenter(searchTerm as PostContentPresenter);
  return res.json(presenter);
});

router.get("/slug/:slug", async (req: Request, res: Response) => {
  const searchTermUseCase = new SearchSlugCategoryNewsUseCase();
  const searchSlug = await searchTermUseCase.execute(req.params.slug as string);
  const presenter = new SearchSlugPresenter({
    item: searchSlug.item,
    content: searchSlug.content as GetCategoryContentPresenter,
  });
  return res.json(presenter);
});

export default router;
