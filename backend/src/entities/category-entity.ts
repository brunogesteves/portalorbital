import type { Category as CategoryPrisma } from "@prisma/client";

export class CategoryEntity {
  id?: number;
  name: string;
  slug: string;

  constructor(name: string, slug: string, id?: number) {
    this.id = id;
    this.name = name;
    this.slug = slug;
  }

  static fromCreate(data: Pick<CategoryEntity, "name" | "slug">): CategoryEntity {
    return new CategoryEntity(data.name, data.slug, 0);
  }

  static fromDelete(data: Pick<CategoryEntity, "id">): CategoryEntity {
    return new CategoryEntity("", "", data.id);
  }

  static fromPersistence(data: CategoryPrisma): CategoryEntity {
    return new CategoryEntity(data.name, data.slug, data.id);
  }
}
