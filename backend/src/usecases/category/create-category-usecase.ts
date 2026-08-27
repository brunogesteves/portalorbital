import { CategoryEntity } from './../../entities/category-entity';
import type { Request } from "express";
import { CategoryRepository } from "../../repository/category/category-repository";
import type { GetCategories } from "../../controllers/category/presenters/get-category-presenters";

export class CreateCategorysUseCase {

  public async execute(req: Request): Promise<GetCategories> {

    const {name, slug} = req.body
    const categoryEntity = new CategoryEntity(name, slug)
    const createCategoryRepository = new CategoryRepository();
    const result = await createCategoryRepository.create(categoryEntity);
    return result;
  }
}
