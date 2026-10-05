import { PostPublished } from "@prisma/client";

export type PostBody = {
  title: string;
  content: string;
  categoryId: string;
  scheduledAt: string;
  thumbnail: string;
  slide: string;
  highlight: string;
  published: string;
  action: string;
};
