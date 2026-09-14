import type { Category as CategoryPrisma } from "@prisma/client";
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

  //   static fromPersistence(data: CategoryPrisma): CategoryEntity {
  //   return new CategoryEntity(data.name, data.slug, data.id);
  // }
}
