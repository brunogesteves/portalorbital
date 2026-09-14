import { CategoryRepository } from "../../repository/category/category-repository";
import type { DeleteCategoryDTO } from "../../controllers/category/dtos/delete-create-category.dto";
import { CategoryEntity } from "../../entities/category-entity";

export class DeleteCategorysUseCase {
  public async execute(dto: DeleteCategoryDTO): Promise<CategoryEntity> {
    const { id } = dto;

    const deleteCategoryRepository = new CategoryRepository();

    return await deleteCategoryRepository.delete(id);
  }
}
