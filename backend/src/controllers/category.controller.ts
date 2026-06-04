import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { isValidNameOrTitle, slugify } from '../lib/slug';

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
  
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'O nome da categoria é obrigatório' });
  }

  // 1. Validar se há caracteres especiais
  if (!isValidNameOrTitle(name)) {
    return res.status(400).json({ message: 'Caracteres especiais (como ?, !, @, etc.) não são permitidos no nome da categoria' });
  }

  // Gerar o slug
  const slug = slugify(name);

  try {
    // 2. Validar se nome ou slug já existem no banco
    const existingName = await prisma.category.findFirst({
      where: { name }
    });
    if (existingName) {
      return res.status(400).json({ message: 'Já existe uma categoria com este nome' });
    }

    const existingSlug = await prisma.category.findFirst({
      where: { slug }
    });
    if (existingSlug) {
      return res.status(400).json({ message: 'Já existe uma categoria com este slug' });
    }

    const category = await prisma.category.create({
      data: { name, slug },
    });
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
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
