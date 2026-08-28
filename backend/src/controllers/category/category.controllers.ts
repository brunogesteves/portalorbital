import { Router, type Request, type Response } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { Role } from "@prisma/client";
import { GetFrontCategoriesUseCase } from "../../usecases/category/get-front-categories-usecase";
import { GetCategoriesUseCase } from "../../usecases/category/get-categories-usecase";
import { CreateCategorysUseCase } from "../../usecases/category/create-category-usecase";
import { DeleteCategorysUseCase } from "../../usecases/category/delete-category-usecase";

const router = Router();

router.get("/", authenticate, async (req: Request, res: Response) => {
  const getCategories = new GetCategoriesUseCase();
  const result = await getCategories.execute();
  return res.json(result);
});

router.get("/front", async (req: Request, res: Response) => {
  const getCategories = new GetFrontCategoriesUseCase();
  const result = await getCategories.execute();
  return res.json(result);
});

router.post("/", authenticate, authorize([Role.ADM]), async (req: Request, res: Response) => {
  const createCategory = new CreateCategorysUseCase();
  const result = await createCategory.execute(req);
  return res.json(result);
});

router.delete("/:id", authenticate, authorize([Role.ADM]), async (req: Request, res: Response) => {
  const deleteCategory = new DeleteCategorysUseCase();
  const result = await deleteCategory.execute(req);
  return res.json(result);
});

export default router;
