import { CategoryRepository } from "../../repository/category/category-repository";
import { PostRepository } from "../../repository/post/post-repository";
import type { SearchSlugPresenter } from "../../controllers/search/presenters/search-slug-presenter";

export class SearchSlugCategoryNewsUseCase {
  public async execute(slug: string): Promise<SearchSlugPresenter> {
    const categoryContent = await new CategoryRepository().getCategoryContent(slug);

    if (categoryContent) {
      return { item: "category", content: categoryContent };
    } else {
      return { item: "news", content: await new PostRepository().getPostBySlug(slug as string) };
    }
  }
}
