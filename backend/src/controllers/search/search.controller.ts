import { type Request, type Response, Router } from "express";

import { SearchTermUseCase } from "../../usecases/search/searchTerm-usecase";
import { SearchBySlugOrCategoryContentUseCase } from "../../usecases/search/search-slug-category-news-usecase";

const router = Router();

router.get("/searchcontent/:term", async (req: Request, res: Response) => {
  const { term } = req.params;
  const searchTermUseCase = new SearchTermUseCase();
  const searchByTerm = await searchTermUseCase.execute(term as string);
  return res.json(searchByTerm);
});

router.get("/slug/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;
  const searchByTermUseCase = new SearchBySlugOrCategoryContentUseCase();
  const searchBySlug = await searchByTermUseCase.execute(slug as string);

  return res.json(searchBySlug);
});

export default router;
