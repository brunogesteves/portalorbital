import type { Request } from "express";
import { CategoryRepository } from "../../repository/category/category-repository";

export class DeleteCategorysUseCase {
  
  public async execute(req: Request): Promise<boolean> {
    const { id } = req.params;
    const deleteCategoryRepository = new CategoryRepository();
    const result = await deleteCategoryRepository.delete(Number(id));
    return result;
  }
}
