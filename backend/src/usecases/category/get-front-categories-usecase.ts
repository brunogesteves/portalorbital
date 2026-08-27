import { CategoryRepository } from "../../repository/category/category-repository";
import type { GetCategories } from "../../controllers/category/presenters/get-category-presenters";


export class GetFrontCategoriesUseCase {
  public async execute(): Promise<GetCategories[]> {
    const categoryRepository = new CategoryRepository();
    const result = categoryRepository.frontCategories();
    return result;
  }
}
