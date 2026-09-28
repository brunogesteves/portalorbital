import { PostEntity } from "./post/post-entity";
import { Category } from "@prisma/client";

export interface CategoryProps {
  id?: number;
  name: string;
  slug: string;

  totalPosts?: number;
  posts?: PostEntity[];
}

export class CategoryEntity {
  id?: number;
  name: string;
  slug: string;

  totalPosts?: number;
  posts?: PostEntity[];

  constructor(params: CategoryProps) {
    this.id = params.id;
    this.name = params.name;
    this.slug = params.slug;
    this.totalPosts = params.totalPosts;
    this.posts = params.posts;
  }

  static fromCreateCategoryDTO(name: string, slug: string): CategoryEntity {
    return new CategoryEntity({
      name,
      slug,
    });
  }

  static fromPersistence(category: Category, totalPosts: number): CategoryEntity {
    return new CategoryEntity({
      id: category.id,
      name: category.name,
      slug: category.slug,
      totalPosts,
    });
  }
}
