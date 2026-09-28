import { PostPublished } from "@prisma/client";

export type PostBody = {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  scheduledAt: Date;
  published: PostPublished;
  thumbnail: string;
  slide: boolean;
  highlight: boolean;
  authorId: number;
};
