import prisma from "../../lib/prisma";
import type { SearchContent } from "../../controllers/search/presenters/search-presenters";
import { CategoryRepository } from "../category/category-repository";
import { PostRepository } from "../post/post-repository";

export class SearchRepository {
  private prisma = prisma;

  // Eu quis dizer que o motodo inteiro deve ficar no repository respectivo.
  // Esse arquivo não deve existir

  public async getContent(slug: string) {
    const categoryContent = new CategoryRepository().getCategoryContent(slug);
    if (categoryContent) return { item: "category", content: categoryContent };

    const newsContent = new PostRepository().getNewsContent(slug);
    if (newsContent) return { item: "news", content: newsContent };
  }

  public async getSearchContentFromTerm(term: string): Promise<SearchContent[] | undefined> {
    const postsResults = new PostRepository().searchTerm(term);
    if (postsResults) return postsResults;
  }
}
