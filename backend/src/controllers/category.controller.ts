import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name },
    });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar categoria' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    return res.json({ message: 'Categoria excluída' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao excluir categoria' });
  }
};
