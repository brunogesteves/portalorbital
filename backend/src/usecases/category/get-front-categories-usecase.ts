import type { GetCategories } from '../../entities/category/get-category-entity';
import { CategoryRepository } from '../../repository/category/category-repository';


export class GetFrontCategoriesUseCase {
    public async execute(): Promise<GetCategories[]> {
        const categoryRepository = new CategoryRepository()
        const result = categoryRepository.frontCategories()
        return result
    }
}