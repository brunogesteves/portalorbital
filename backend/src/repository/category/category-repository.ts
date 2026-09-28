import prisma from "../../lib/prisma";
import { CategoryEntity } from "../../entities/category-entity";
import { PostEntity } from "../../entities/post/post-entity";
import { PostPublished } from "@prisma/client";

export class CategoryRepository {
  private prisma = prisma;

  public create(data: CategoryEntity): Promise<CategoryEntity> {
    return this.prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });
  }

  public getCategoryByName(name: string): Promise<CategoryEntity | null> {
    return this.prisma.category.findFirst({
      where: { name },
    });
  }

  public async getAllWithTotalPosts(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return categories.map((category) =>
      CategoryEntity.fromPersistence(category, category._count.posts),
    );
  }

  public getCategoriesWithNoPostSlide(): Promise<CategoryEntity[]> {
    return this.prisma.category.findMany({
      where: {
        posts: {
          some: {
            published: PostPublished.ACTIVE,
          },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  public deleteCategory(id: number): Promise<CategoryEntity> {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  public async getCategoryContent(slug: string): Promise<PostEntity[] | null> {
    const postsFromCategory = await this.prisma.category.findFirst({
      where: {
        slug,
      },
      select: {
        posts: true,
      },
    });
    if (!postsFromCategory) {
      return null;
    }

    return postsFromCategory.posts;
  }
}
