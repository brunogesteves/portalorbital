import { CategoryEntity } from "./../../entities/category-entity";
import { CategoryRepository } from "../../repository/category/category-repository";
import type { CreateCategoryDTO } from "../../controllers/category/dtos/create-category.dto";
import { slugify } from "../../lib/slug";

export class CreateCategorysUseCase {
  public async execute(dto: CreateCategoryDTO): Promise<CategoryEntity> {
    const { name } = dto;
    const slug = slugify(name);

    const createCategoryRepository = new CategoryRepository();
    const existCategory = await createCategoryRepository.getCategoryByName(name);
    if (existCategory) {
      throw new Error("Já existe uma categoria com este nome");
    }

    const categoryEntity = CategoryEntity.fromCreateCategoryDTO(name, slug);
    return await createCategoryRepository.create(categoryEntity);
  }
}
