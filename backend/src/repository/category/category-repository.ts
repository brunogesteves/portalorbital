import prisma from "../../lib/prisma";
import type { GetCategoriesPresenter } from "../../controllers/category/presenters/get-category-presenters";
import type { CategoryEntity } from "../../entities/category-entity";

export class CategoryRepository {
  private prisma = prisma;

  // TODO: Separar este metodo em dois, um para criar a categoria e outro para verificar
  // se a categoria já existe.
  // O "existingName" deve ficar no usecase
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

  // TODO: Renomear para para o que ele faz e não pra quem ele serve"
  // Ex.: getCategoriesWithNoPostSlide (não tenho certeza do que ele deveria retornar)
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

  // TODO: Realmente necessário verificar se a categoria foi deletada? Creio que se
  // não retornou erro, subentende-se foi deletada com sucesso.
  // Não entendi o throw
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
