import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { Role } from '@prisma/client';
import fs from 'fs';
import path from 'path';

export const getPosts = async (req: any, res: Response) => {
  try {
    const { q } = req.query;
    const whereClause: any = {};

    // Regra: PBR só vê os seus, ADM vê todos
    if (req.user.role === Role.PBR) {
      whereClause.authorId = req.user.id;
    }

    if (q) {
      whereClause.OR = [
        { title: { contains: String(q) } },
        { content: { contains: String(q) } },
      ];
    }

    const { categoryId, authorId } = req.query;

    if (categoryId) {
      whereClause.categoryId = Number(categoryId);
    }

    // Se for ADM, permite filtrar por authorId passado na query
    if (req.user.role === Role.ADM && authorId) {
      whereClause.authorId = Number(authorId);
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        category: true,
        author: {
          select: { name: true, email: true, role: true }
        }
      },
      orderBy: { scheduledAt: 'desc' }
    });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar posts' });
  }
};

export const getPostById = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        author: {
          select: { name: true, email: true, role: true }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    // Regra: PBR só vê os seus, ADM vê todos
    if (req.user.role !== Role.ADM && post.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Sem permissão para visualizar este post' });
    }

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar post' });
  }
};

export const createPost = async (req: any, res: Response) => {
  const { title, content, categoryId, scheduledAt, thumbnailUrl } = req.body;
  const thumbnail = req.file ? `/uploads/${req.file.filename}` : thumbnailUrl || null;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        thumbnail,
        scheduledAt: new Date(scheduledAt),
        categoryId: Number(categoryId),
        authorId: req.user.id,
        status: 'offAir' // Padrão conforme solicitado: offAir = No ar
      },
    });
    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar post' });
  }
};

export const updatePost = async (req: any, res: Response) => {
  const { id } = req.params;
  const { title, content, categoryId, scheduledAt, thumbnailUrl } = req.body;
  const thumbnail = req.file ? `/uploads/${req.file.filename}` : thumbnailUrl || undefined;

  try {
    // Verificar se o usuário pode editar (é dono ou ADM)
    const existingPost = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!existingPost) return res.status(404).json({ message: 'Post não encontrado' });

    if (req.user.role !== Role.ADM && existingPost.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Sem permissão para editar este post' });
    }

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        categoryId: Number(categoryId),
        scheduledAt: new Date(scheduledAt),
        ...(thumbnail && { thumbnail }),
      },
    });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar post' });
  }
};

export const deletePost = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const existingPost = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!existingPost) return res.status(404).json({ message: 'Post não encontrado' });

    if (req.user.role !== Role.ADM && existingPost.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Sem permissão para excluir este post' });
    }

    await prisma.post.delete({ where: { id: Number(id) } });
    return res.json({ message: 'Post excluído' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao excluir post' });
  }
};

export const updatePostStatus = async (req: any, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Apenas ADM pode mudar status
    if (req.user.role !== Role.ADM) {
      return res.status(403).json({ message: 'Apenas administradores podem mudar o status' });
    }

    if (!['liveAir', 'offAir'].includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { status: status === 'liveAir' ? 'offAir' : 'liveAir' }
    });

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar status' });
  }
};

export const uploadEditorImage = async (req: any, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhuma imagem enviada' });
  }
  const url = `/uploads/${req.file.filename}`;
  return res.json({ url });
};

export const getImages = async (req: Request, res: Response) => {
  try {
    const uploadsDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      return res.json([]);
    }
    const files = fs.readdirSync(uploadsDir);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/uploads/${file}`);
    return res.json(images);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar imagens' });
  }
};
