import { CategoryRepository } from "../../repository/category/category-repository";

export class DeleteCategorysUseCase {
  public async execute(id: number): Promise<void> {
    const categoryRepository = new CategoryRepository();
    await categoryRepository.deleteCategory(id);
  }
}
