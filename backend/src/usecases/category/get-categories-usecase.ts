import { CategoryRepository } from "../../repository/category/category-repository";
import type { GetCategoriesPresenter } from "../../controllers/category/presenters/get-category-presenters";

export class GetCategoriesUseCase {

  public async execute(): Promise<GetCategoriesPresenter[]> {
    const categoryRepository = new CategoryRepository();
    const categories = categoryRepository.getCategories();
    return categories;
  }
}
