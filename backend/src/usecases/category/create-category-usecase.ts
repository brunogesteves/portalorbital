import { CategoryEntity } from "./../../entities/category-entity";
import { CategoryRepository } from "../../repository/category/category-repository";
import type { CreateCategoryDTO } from "../../controllers/category/dtos/create-category.dto";

export class CreateCategorysUseCase {
  public async execute(dto: CreateCategoryDTO): Promise<CategoryEntity> {
    const { name, slug } = dto;

    const categoryEntity = CategoryEntity.fromCreate({ name, slug });
    const createCategoryRepository = new CategoryRepository();
    const existCategory = !!(await createCategoryRepository.getCategoryByName(name));

    if (existCategory) {
      throw new Error("Já existe uma categoria com este nome");
    }

    return await createCategoryRepository.create(categoryEntity);
  }
}
