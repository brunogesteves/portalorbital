import { CategoryRepository } from "../../repository/category/category-repository";
import type { GetCategoriesPresenter } from "../../controllers/category/presenters/get-category-presenters";

export class GetFrontCategoriesUseCase {
  public async execute(): Promise<GetCategoriesPresenter[]> {
    const categoryRepository = new CategoryRepository();
    const result = categoryRepository.getCategoriesWithNoPostSlide();
    return result;
  }
}
