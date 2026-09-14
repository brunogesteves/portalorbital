import { type Request, type Response, Router } from "express";
import { SearchTermUseCase } from "../../usecases/search/searchTerm-usecase";
import { SearchSlugCategoryNewUseCase } from "../../usecases/search/search-slug-category-news-usecase";
import { validateBody } from "../../middlewares/body-validator";
import { SearchTermDTO, searchTermSchema } from "./dtos/search-term.dto";
import { SearchSlugDTO, searchSlugSchema } from "./dtos/search-slug.dto";
import { PostContentPresenter } from "../post/presenters/post-presenters";
import { SearchSlugPresenter } from "./presenters/search-slug-presenter";
import { GetCategoryContentPresenter } from "../category/presenters/get-category-content-presenters";

const router = Router();

router.get(
  "/searchcontent/:term",
  validateBody(searchTermSchema),
  async (req: Request, res: Response) => {
    const searchTermUseCase = new SearchTermUseCase();
    const searchTerm = await searchTermUseCase.execute(req.params as SearchTermDTO);
    const presenter = new PostContentPresenter(searchTerm as PostContentPresenter);
    return res.json(presenter);
  },
);

router.get("/slug/:slug", validateBody(searchSlugSchema), async (req: Request, res: Response) => {
  const searchTermUseCase = new SearchSlugCategoryNewUseCase();
  const searchSlug = await searchTermUseCase.execute(req.params as SearchSlugDTO);
  const presenter = new SearchSlugPresenter({
    item: searchSlug.item,
    content: searchSlug.content as GetCategoryContentPresenter,
  });
  return res.json(presenter);
});

export default router;
