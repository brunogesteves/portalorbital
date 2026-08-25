// import type { Category } from "@prisma/client";
import type { Request } from "express";
import prisma from "../../lib/prisma";
import type { CreateCategories } from "../../entities/category/create-category-entity";
import type { GetCategories } from "../../entities/category/get-category-entity";
import type { GetCategoryContent } from "../../entities/category/category-content-entity";

export class CategoryRepository {
  private prisma = prisma;

  public async create(cat: CreateCategories): Promise<GetCategories> {
    const { name, slug } = cat;

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

  public async getCategories(): Promise<GetCategories[]> {
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

  public async frontCategories(): Promise<GetCategories[]> {
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

  public async delete(id: number): Promise<boolean> {
    const categoryHasBeenDeleted = await this.prisma.category.delete({
      where: { id },
    });
    if (categoryHasBeenDeleted) {
      return true;
    }
    throw new Error("Já existe uma categoria com este nome");
  }

  public async getCategoryContent(req: Request): Promise<GetCategoryContent | null> {
    const { categoryContent } = req.params;

    const getCategoryContent = await this.prisma.category.findFirst({
      where: {
        slug: categoryContent as string,
      },
      select: {
        name: true,
        posts: true,
      },
    });
    return getCategoryContent;
  }
}
