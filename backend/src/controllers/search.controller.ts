import { Response } from "express";

import prisma from "../lib/prisma";

export const openContent = async (req: any, res: Response) => {
  console.log("controller open: ");

  const { slug } = req.params;
  const categoryContent = await prisma.category.findFirst({
    where: {
      slug,
    },
    include: {
      posts: true,
    },
  });

  if (categoryContent)
    return res.json({ type: "category", content: categoryContent });

  const newsContent = await prisma.post.findFirst({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      thumbnail: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (newsContent) return res.json({ type: "news", content: newsContent });
  if (!categoryContent && !newsContent)
    return res.status(404).json({ message: "Página não encontrada" });
};

export const searchContent = async (req: any, res: Response) => {
  const { term } = req.query;
  console.log("controller search: ", term);
  const postsResults = await prisma.post.findMany({
    where: {
      OR: [
        {
          content: {
            contains: term,
          },
        },
        {
          title: {
            contains: term,
          },
        },
        {
          slug: {
            contains: term,
          },
        },
      ],
    },
    include: {
      category: true,
    },
  });

  return res.json({
    postsResults,
    message:
      postsResults.length === 0
        ? "Nenhum resultado encontrado para: " + term
        : null,
  });
};
