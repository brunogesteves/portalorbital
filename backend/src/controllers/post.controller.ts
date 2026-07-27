import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { Role } from "@prisma/client";
import fs from "fs";
import path from "path";
import { slugify } from "../lib/slug";
const { post: pst } = prisma;
const { category: cat } = prisma;


export const slidersImages = async (req: any, res: Response) => {
  try {
    const posts = await pst.findMany({
      where: {
        slide: true,

      }, select: {
        thumbnail: true,
        slug: true,
        title: true
      }
    })
    // console.log(posts)

    return res.json(posts);
  } catch {
    return res.status(500).json({ message: "Erro ao buscar posts" });
  }
};

export const allPosts = async (req: any, res: Response) => {

  try {
    const posts = await cat.findMany({
      where: {
        posts: {
          some: {
            slide: false
          },
        },
      },
      include: {
        posts: {
          where: {
            slide: false
          },
          take: 3,
          orderBy: {
            createdAt: "desc"
          },
          omit: {
            createdAt: true,
            updatedAt: true,
            status: true,
            scheduledAt: true,
            slide: true
          },
          include: {
            author: {
              select: {
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    })
    console.log(posts)

    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar posts" });
  }
};

export const getPosts = async (req: any, res: Response) => {
  console.log("first")
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

    const posts = await pst.findMany({
      where: whereClause,
      include: {
        category: true,
        author: {
          select: { name: true, email: true, role: true },
        },
      },
      orderBy: { scheduledAt: "desc" },
    });
    return res.json(posts);
  } catch (error: any) {
    console.error("error posts", error?.message, error?.stack);
    return res.status(500).json({ message: "Erro ao buscar posts", error: error?.message });
  }
};

export const getPostById = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const uniquePost = await pst.findUnique({
      where: { id: Number(id) },
    });

    if (!uniquePost) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    // Regra: PBR só vê os seus, ADM vê todos
    if (req.user.role !== Role.ADM && uniquePost.authorId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Sem permissão para visualizar este post" });
    }

    return res.json(uniquePost);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar post" });
  }
};

export const createUpdatePost = async (req: any, res: Response) => {
  const { id } = req.params;
  const isEdit = id && id !== "undefined" && id !== "null";

  try {
    const { title, content, categoryId, scheduledAt, thumbnailUrl, slide, highlight } = req.body;
    const thumbnail = req.file
      ? `/images/${req.file.filename}`
      : thumbnailUrl || null;

    const slug = slugify(title);

    const existingTitle = await pst.findFirst({
      where: {
        title,
        ...(isEdit && { id: { not: Number(id) } }),
      },
    });
    if (existingTitle) {
      return res.status(400).json({ message: "Já existe uma notícia com este título" });
    }

    const existingSlug = await pst.findFirst({
      where: {
        slug,
        ...(isEdit && { id: { not: Number(id) } }),
      },
    });
    if (existingSlug) {
      return res.status(400).json({ message: "Já existe uma notícia com este slug" });
    }

    const upsertPost = await pst.upsert({
      where: { id: isEdit ? Number(id) : 0 },
      update: {
        title,
        slug,
        content,
        categoryId: Number(categoryId),
        scheduledAt: new Date(scheduledAt),
        ...(thumbnail && { thumbnail }),
        ...(slide !== undefined && { slide: slide === "true" }),
        ...(highlight !== undefined && { highlight: highlight === "true" }),
      },
      create: {
        title,
        slug,
        content,
        thumbnail,
        scheduledAt: new Date(scheduledAt),
        categoryId: Number(categoryId),
        authorId: req.user.id,
        status: false,
        slide: slide === "true",
        highlight: highlight === "true",
      },
    });
    return res.status(201).json(upsertPost);
  } catch {
    return res.status(500).json({ message: isEdit ? "Erro ao atualizar o post" : "Erro ao criar o post" });
  }
};

export const updatePostSlide = async (req: any, res: Response) => {
  const { id } = req.params;
  const { slide } = req.body;

  try {
    if (req.user.role !== Role.ADM) {
      return res
        .status(403)
        .json({ message: "Apenas administradores podem alterar o slide" });
    }

    if (typeof slide !== "boolean") {
      return res.status(400).json({ message: "Valor inválido para slide" });
    }

    const post = await pst.update({
      where: { id: Number(id) },
      data: { slide },
    });

    return res.json(post);
  } catch {
    return res.status(500).json({ message: "Erro ao atualizar slide" });
  }
};

export const updatePostHighlight = async (req: any, res: Response) => {
  const { id } = req.params;
  const { highlight } = req.body;

  try {
    if (req.user.role !== Role.ADM) {
      return res
        .status(403)
        .json({ message: "Apenas administradores podem alterar o destaque" });
    }

    if (typeof highlight !== "boolean") {
      return res.status(400).json({ message: "Valor inválido para highlight" });
    }

    const post = await pst.update({
      where: { id: Number(id) },
      data: { highlight },
    });

    return res.json(post);
  } catch {
    return res.status(500).json({ message: "Erro ao atualizar destaque" });
  }
};

export const deletePost = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const existingPost = await pst.findUnique({
      where: { id: Number(id) },
    });
    if (!existingPost)
      return res.status(404).json({ message: "Post não encontrado" });

    if (req.user.role !== Role.ADM && existingPost.authorId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Sem permissão para excluir este post" });
    }

    await pst.delete({ where: { id: Number(id) } });
    return res.json({ message: "Post excluído" });
  } catch {
    return res.status(500).json({ message: "Erro ao excluir post" });
  }
};

export const updatePostStatus = async (req: any, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Apenas ADM pode mudar status
    if (req.user.role !== Role.ADM) {
      return res
        .status(403)
        .json({ message: "Apenas administradores podem mudar o status" });
    }

    if (typeof status !== "boolean") {
      return res.status(400).json({ message: "Status inválido" });
    }

    const post = await pst.update({
      where: { id: Number(id) },
      data: { status },
    });

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar status" });
  }
};

export const uploadEditorAudio = async (req: any, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nenhum áudio enviado" });
  }
  const url = `/audio/${req.file.filename}`;
  return res.json({ url });
};

export const uploadEditorImage = async (req: any, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nenhuma imagem enviada" });
  }
  const url = `/images/${req.file.filename}`;
  return res.json({ url });
};

export const getImages = async (req: Request, res: Response) => {
  try {
    const uploadsDir = path.join(__dirname, "../../public/images");
    if (!fs.existsSync(uploadsDir)) {
      return res.json([]);
    }
    const files = fs.readdirSync(uploadsDir);
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file) => `/images/${file}`);
    return res.json(images);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar imagens" });
  }
};
