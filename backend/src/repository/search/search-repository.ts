import prisma from "../../lib/prisma";
import type { SearchContent } from "../../entities/search/search-entity";

export class SearchRepository {
  private prisma = prisma;

  public async getContent(slug: string) {
    const categoryContent = await this.prisma.category.findFirst({
      where: {
        slug,
      },
      select: {
        name: true,
        posts: true
      },


    });
    if (categoryContent) return { item: "category", content: categoryContent }

    const newsContent = await this.prisma.post.findFirst({
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
    if (newsContent) return { item: "news", content: newsContent }
  }

  public async searchTerm(term: string): Promise<SearchContent[]> {
    const postsResults = await this.prisma.post.findMany({
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
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return postsResults;
  }
}
