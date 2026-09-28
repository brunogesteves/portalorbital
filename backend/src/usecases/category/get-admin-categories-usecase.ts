import { CategoryRepository } from "../../repository/category/category-repository";
import { CategoryEntity } from "../../entities/category-entity";

export class GetAdminCategoriesUseCase {
  public async execute(): Promise<CategoryEntity[]> {
    const categoryRepository = new CategoryRepository();
    return await categoryRepository.getAllWithTotalPosts();
  }
}
