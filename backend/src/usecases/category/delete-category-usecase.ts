import { CategoryRepository } from "../../repository/category/category-repository";

export class DeleteCategorysUseCase {
  public async execute(id: number): Promise<boolean> {
    const deleteCategoryRepository = new CategoryRepository();
    const result = await deleteCategoryRepository.delete(id);
    return result;
  }
}
