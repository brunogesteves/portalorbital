import { Prisma } from "@prisma/client";

export type PostWithCategoryAuthorRelations = Prisma.PostGetPayload<{
  include: { category: true; author: true };
}>;

export type PostWithCategoryRelations = Prisma.PostGetPayload<{
  include: { category: true };
}>;

export type PostWithAuthorRelations = Prisma.PostGetPayload<{
  include: { author: true };
}>;

export type CategoryWithAuthorPostsRelations = Prisma.CategoryGetPayload<{
  include: { posts: { include: { author: true } } };
}>;
