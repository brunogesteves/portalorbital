import { Response } from "express";

import prisma from "../lib/prisma";

const { post: pst } = prisma;
const { category: cat } = prisma;

export const searchOneContent = async (req: any, res: Response) => {
  const { slug } = req.params;

  const categoryContent = await cat.findFirst({
    where: {
      slug,
    },
    select: {
      name: true,
      posts: true
    },


  });

  const newsContent = await pst.findFirst({
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
  const postsResults = await pst.findMany({
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
