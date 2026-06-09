import { Response } from "express";

import prisma from "../lib/prisma";

export const searchOneContent = async (req: any, res: Response) => {
  const { slug } = req.params;
  console.log("controller searchOneContent: ", slug);

  const categoryContent = await prisma.category.findFirst({
    where: {
      slug,
    },
    include: {
      posts: true,
    },
  });

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

  if (categoryContent) {
    return res.json({
      status: true,
      type: "category",
      content: categoryContent,
    });
  } else if (newsContent) {
    return res.json({ status: true, type: "news", content: newsContent });
  } else {
    return res.json({ status: false });
  }
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
