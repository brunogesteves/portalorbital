import prisma from "../../lib/prisma";
import type { GetCategoriesPresenter } from "../../controllers/category/presenters/get-category-presenters";
import { CategoryEntity } from "../../entities/category-entity";

export class CategoryRepository {
  private prisma = prisma;

  public async create(data: CategoryEntity): Promise<CategoryEntity> {
    const created = await this.prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    return CategoryEntity.fromPersistence(created);
  }

  public async getCategoryByName(name: string) {
    return await this.prisma.category.findFirst({
      where: { name },
    });
  }

  public async getCategories(): Promise<GetCategoriesPresenter[]> {
    return await this.prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
  }

  public async getCategoriesWithNoPostSlide(): Promise<GetCategoriesPresenter[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        posts: {
          some: {
            slide: false,
          },
        },
      },
      orderBy: { name: "asc" },
    });
    return categories;
  }

  public async delete(data: CategoryEntity): Promise<boolean> {
    const { id } = data;
    const categoryHasBeenDeleted = await this.prisma.category.delete({
      where: { id },
    });
    if (categoryHasBeenDeleted) {
      return true;
    }
    return false;
  }

  // Melhor getCategoryBySlug
  public async getCategoryContent(slug: string) {
    return await this.prisma.category.findFirst({
      where: {
        slug,
      },
      select: {
        name: true,
        posts: true,
      },
    });
  }
}
