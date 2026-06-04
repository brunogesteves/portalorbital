import { Response } from "express";

import prisma from "../lib/prisma";

export const searchContent = async (req: any, res: Response) => {
  console.log("controller");
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
