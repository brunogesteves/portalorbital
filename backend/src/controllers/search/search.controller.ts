import { type Request, type Response, Router } from "express";
import { SearchTermUseCase } from "../../usecases/search/searchTerm-usecase";
import { NewSCategoryUseCase } from "../../usecases/search/category-news-usecase";

const router = Router();

router.get("/searchcontent", async (req: Request, res: Response) => {
  const searchTerm = new SearchTermUseCase();
  const result = await searchTerm.execute(req);
  return res.json(result);
});

router.get("/slug/:slug", async (req: Request, res: Response) => {
  const searchTerm = new NewSCategoryUseCase();
  const result = await searchTerm.execute(req);
  return res.json(result);
});

export default router;
