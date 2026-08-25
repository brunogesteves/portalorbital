import type { Request } from "express";

import { CategoryRepository } from "../../repository/category/category-repository";
import type { GetCategoryContent } from "../../entities/category/category-content-entity";

export class GetContentCategoryUseCase {
  public async execute(req: Request): Promise<GetCategoryContent | null> {
    const searchRepository = new CategoryRepository();
    const result = await searchRepository.getCategoryContent(req);
    return result;
  }
}
