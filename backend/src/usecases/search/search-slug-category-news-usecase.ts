import type { Request } from "express";
import { CategoryRepository } from "../../repository/category/category-repository";
import { PostRepository } from "../../repository/post/post-repository";
import type { SearchSlugPresenter } from "../../controllers/search/presenters/search-slug-presenter";
import { SearchSlugDTO } from "../../controllers/search/dtos/search-slug.dto";

export class SearchSlugCategoryNewUseCase {
  public async execute(dto: SearchSlugDTO): Promise<SearchSlugPresenter> {
    const { slug } = dto;

    const categoryContent = await new CategoryRepository().getCategoryContent(slug);

    if (categoryContent) {
      return { item: "category", content: categoryContent };
    } else {
      return { item: "news", content: await new PostRepository().getPostBySlug(slug as string) };
    }
  }
}
