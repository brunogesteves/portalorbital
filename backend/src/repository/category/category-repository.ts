import prisma from "../../lib/prisma";
import type { GetCategoriesPresenter } from "../../controllers/category/presenters/get-category-presenters";
import type { CategoryEntity } from "../../entities/category-entity";

export class CategoryRepository {
  private prisma = prisma;

  // ANTES
  // public async create(data: CategoryEntity): Promise<GetCategoriesPresenter> {
  //   const { name, slug } = data;

  //   const createCategory = await this.prisma.category.create({
  //     data: { name, slug },
  //   });
  //   return createCategory;
  // }

  // DEPOIS
  // pode retornar direto as chamadas do banco.
  // faça isso em todos os outros métodos.
  public async create(data: CategoryEntity): Promise<GetCategoriesPresenter> {
    const { name, slug } = data;

    return this.prisma.category.create({
      data: {
        name,
        slug,
      },
    });
  }

  // Melhor mudar para getCategoryByName e retornar o resultado. Aí lá no useCase verifica se a categoria existe.
  public async existCategoryByName(name: string): Promise<boolean> {
    const existingCategoryByName = await this.prisma.category.findFirst({
      where: { name },
    });
    return !!existingCategoryByName;
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

  // TODO: Vamos melhorar depois essa logica
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
    const categoryContent = await this.prisma.category.findFirst({
      where: {
        slug,
      },
      select: {
        name: true,
        posts: true,
      },
    });
    return categoryContent;
  }
}
