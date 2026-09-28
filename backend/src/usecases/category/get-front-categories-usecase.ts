import { CategoryEntity } from "../../entities/category-entity";
import { CategoryRepository } from "../../repository/category/category-repository";

export class GetFrontCategoriesUseCase {
  public async execute(): Promise<CategoryEntity[]> {
    const categoryRepository = new CategoryRepository();
    const getAllFrontCategories = await categoryRepository.getCategoriesWithNoPostSlide();
    return getAllFrontCategories;
  }
}
