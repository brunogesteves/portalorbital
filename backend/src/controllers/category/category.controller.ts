import { Router, type Request, type Response } from "express";

import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { GetAdminCategoriesUseCase } from "../../usecases/category/get-admin-categories-usecase";
import { GetFrontCategoriesUseCase } from "../../usecases/category/get-front-categories-usecase";
import { CreateCategorysUseCase } from "../../usecases/category/create-category-usecase";
import { DeleteCategorysUseCase } from "../../usecases/category/delete-category-usecase";
import { createCategorySchema } from "./dtos/create-category.dto";
import { validateBody } from "../../middlewares/body-validator";
import { UserRole } from "../../entities/user/types/user-role";

const router = Router();

router.get("/admin", authenticate, async (req: Request, res: Response) => {
  const getAdminCategoriesUseCase = new GetAdminCategoriesUseCase();
  const categories = await getAdminCategoriesUseCase.execute();
  return res.json(categories);
});

router.get("/front", async (req: Request, res: Response) => {
  const getFrontCategoriesUseCase = new GetFrontCategoriesUseCase();
  const categories = await getFrontCategoriesUseCase.execute();

  return res.json(categories);
});

router.post(
  "/",
  authenticate,
  authorize([UserRole.ADM]),
  validateBody(createCategorySchema),
  async (req: Request, res: Response) => {
    const createCategoryUseCase = new CreateCategorysUseCase();
    const category = await createCategoryUseCase.execute(req.body);
    return res.json(category);
  },
);

router.delete(
  "/:id",
  authenticate,
  authorize([UserRole.ADM]),
  async (req: Request, res: Response) => {
    const deleteCategoryUseCase = new DeleteCategorysUseCase();
    await deleteCategoryUseCase.execute(Number(req.params.id));
    return res.json(true);
  },
);

export default router;
