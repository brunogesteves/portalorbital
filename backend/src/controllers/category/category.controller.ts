import { Router, type Request, type Response } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { Role } from "@prisma/client";
import { GetFrontCategoriesUseCase } from "../../usecases/category/get-front-categories-usecase";
import { GetCategoriesUseCase } from "../../usecases/category/get-categories-usecase";
import { CreateCategorysUseCase } from "../../usecases/category/create-category-usecase";
import { DeleteCategorysUseCase } from "../../usecases/category/delete-category-usecase";
import { CreateCategoryPresenter } from "./presenters/create-category-presenters";
import { DeleteCategoryPresenter } from "./presenters/delete-category-presenters";
import { validateBody } from "../../middlewares/body-validator";
import { createCategorySchema } from "./dtos/create-category.dto";

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

router.post(
  "/",
  authenticate,
  authorize([Role.ADM]),
  validateBody(createCategorySchema),
  async (req: Request, res: Response) => {
    const createCategoryUseCase = new CreateCategorysUseCase();
    const newCategory = await createCategoryUseCase.execute(req.body);
    const presenter = new CreateCategoryPresenter({
      name: newCategory.name,
      slug: newCategory.slug,
    });
    return res.json(presenter);
  },
);

router.delete("/:id", authenticate, authorize([Role.ADM]), async (req: Request, res: Response) => {
  const deleteCategoryUseCase = new DeleteCategorysUseCase();
  const deleteCategory = await deleteCategoryUseCase.execute(Number(req.params.id));
  const presenter = new DeleteCategoryPresenter(
    deleteCategory.name,
    Number(deleteCategory.id),
    deleteCategory.slug,
  );
  return res.json(presenter);
});

export default router;
