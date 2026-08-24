import type { GetCategories } from '../../entities/category/get-category-entity';
import { CategoryRepository } from '../../repository/category/category-repository';


export class GetCategoriesUseCase {
    public async execute(): Promise<GetCategories[]> {
        const categoryRepository = new CategoryRepository()
        const categories = categoryRepository.getCategories()
        return categories
    }
}