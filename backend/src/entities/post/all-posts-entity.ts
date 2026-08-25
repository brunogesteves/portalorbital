import type { Role } from "@prisma/client";

export interface AllPostsFront {
  id: number;
  name: string;
  slug: string;
  posts: {
    id: number;
    title: string;
    slug: string;
    thumbnail: string | null;
    content: string;
    highlight: boolean;
    categoryId: number;
    authorId: number;
    author: {
      name: string | null;
      email: string;
      role: Role;
    };
  }[];
}
