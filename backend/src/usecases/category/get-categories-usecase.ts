import { CategoryRepository } from "../../repository/category/category-repository";
import type { GetCategories } from "../../controllers/category/presenters/get-category-presenters";

export class GetCategoriesUseCase {

  public async execute(): Promise<GetCategories[]> {
    const categoryRepository = new CategoryRepository();
    const categories = categoryRepository.getCategories();
    return categories;
  }
}
