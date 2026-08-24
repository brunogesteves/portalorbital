import { type Request, type Response, Router } from "express";

import { CreateCategorysUseCase } from "../usecases/category/create-category-usecase";

const router = Router();


router.get("/:slug", async (req: Request, res: Response) => {
    const createCategory = new CreateCategorysUseCase();
    const result = await createCategory.execute(req)
    return res.json(result)
});

export default router;
