import { CategoryRepository } from "../../repository/category/category-repository";
import { CategoryEntity } from "../../entities/category-entity";

export class DeleteCategorysUseCase {
  public async execute(id: number): Promise<CategoryEntity> {
    const deleteCategoryRepository = new CategoryRepository();
    return await deleteCategoryRepository.delete(id);
  }
}
