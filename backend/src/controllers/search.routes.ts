import { type Request, type Response, Router } from "express";

import { SearchTermUseCase } from "../usecases/search/search-term-usecase";

const router = Router();


router.get("/:slug", async (req: Request, res: Response) => {
    const searchTerm = new SearchTermUseCase();
    const result = await searchTerm.execute(req)
    return res.json(result)
});

export default router;
