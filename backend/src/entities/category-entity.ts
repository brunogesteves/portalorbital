import type { Category as CategoryPrisma } from "@prisma/client";
import type { CreateCategoryDTO } from "../controllers/category/dtos/create-category.dto";

export class CategoryEntity {
  id?: number;
  name: string;
  slug: string;

  constructor(params: { name: string; slug: string; id?: number }) {
    this.id = params.id;
    this.name = params.name;
    this.slug = params.slug;
  }

  static fromCreateCategoryDTO(name: string, slug: string): CategoryEntity {
    return new CategoryEntity({
      name,
      slug,
    });
  }

  static fromDelete(data: Pick<CategoryEntity, "id">): CategoryEntity {
    return new CategoryEntity("", "", data.id);
  }

  static fromPersistence(data: CategoryPrisma): CategoryEntity {
    return new CategoryEntity(data.name, data.slug, data.id);
  }
}
