

import type { Request } from "express";
import { CategoryRepository } from "../../repository/category/category-repository";
import type { GetCategories } from "../../entities/category/get-category-entity";

export class CreateCategorysUseCase {
  public async execute(req: Request): Promise<GetCategories> {
    const category = req.body
    const createCategoryRepository = new CategoryRepository();
    const result = await createCategoryRepository.create(category);
    return result

  }
}
