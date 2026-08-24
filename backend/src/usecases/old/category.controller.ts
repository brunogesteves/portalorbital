import type { Request, Response } from "express";
import prisma from "../lib/prisma";

const { category: cat } = prisma;

export const frontCategories = async (req: Request, res: Response) => {
  try {
    const categories = await cat.findMany({
      where: {
        posts: {
          some: {
            slide: false,
          },
        },
      },
      orderBy: { name: "asc" },
    });
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar categorias" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await cat.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar categorias" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, slug } = req.body;

  // Gerar o slug

  try {
    // 2. Validar se nome ou slug já existem no banco
    const existingName = await cat.findFirst({
      where: { name },
    });
    if (existingName) {
      return res.status(400).json({ message: "Já existe uma categoria com este nome" });
    }

    const category = await cat.create({
      data: { name, slug },
    });
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar categoria" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await cat.delete({
      where: { id: Number(id) },
    });
    return res.json({ message: "Categoria excluída" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao excluir categoria" });
  }
};
