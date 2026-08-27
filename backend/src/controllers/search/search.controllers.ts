import { type Request, type Response, Router } from "express";

import { SearchTermUseCase } from "../../usecases/search/search-term-usecase";
import { NewSCategoryUseCase } from "../../usecases/search/category-news-usecase";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const searchTerm = new SearchTermUseCase();
  const result = await searchTerm.execute(req);
  return res.json(result);
});

router.get("/:slug", async (req: Request, res: Response) => {
  const searchTerm = new NewSCategoryUseCase();
  const result = await searchTerm.execute(req);
  return res.json(result);
});

export default router;
