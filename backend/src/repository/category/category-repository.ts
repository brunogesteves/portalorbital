import prisma from "../../lib/prisma";
import type { GetCategoriesPresenter } from "../../controllers/category/presenters/get-category-presenters";
import type { CategoryEntity } from "../../entities/category-entity";

export class CategoryRepository {
  private prisma = prisma;

  public async create(data: CategoryEntity): Promise<GetCategoriesPresenter> {
    const { name, slug } = data;

    const existingName = await this.prisma.category.findFirst({
      where: { name },
    });
    if (existingName) {
      throw new Error("Já existe uma categoria com este nome");
    }

    const createCategory = await this.prisma.category.create({
      data: { name, slug },
    });
    return createCategory;
  }

  public async getCategories(): Promise<GetCategoriesPresenter[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
    return categories;
  }

  public async frontCategories(): Promise<GetCategoriesPresenter[]> {
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
    throw new Error("Já existe uma categoria com este nome");
  }
}
