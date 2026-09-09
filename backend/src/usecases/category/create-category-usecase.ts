import type { Request } from "express";

import { CategoryEntity } from "./../../entities/category-entity";
import { CategoryRepository } from "../../repository/category/category-repository";
import type { GetCategoriesPresenter } from "../../controllers/category/presenters/get-category-presenters";

export class CreateCategorysUseCase {
  public async execute(req: Request): Promise<GetCategoriesPresenter> {
    const { name, slug } = req.body;

    const categoryEntity = CategoryEntity.fromCreate({ name, slug });
    const createCategoryRepository = new CategoryRepository();
    const existCategory = await createCategoryRepository.existCategoryByName(name);

    if (existCategory) {
      throw new Error("Já existe uma categoria com este nome");
    }

    const result = await createCategoryRepository.create(categoryEntity);
    return result;
  }
}
