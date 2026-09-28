import { PostEntity } from "../../entities/post/post-entity";
import { CategoryRepository } from "../../repository/category/category-repository";
import { PostRepository } from "../../repository/post/post-repository";
import { SearchBySlugResult } from "../../types/search-by-slug";

export class SearchBySlugOrCategoryContentUseCase {
  public async execute(
    slug: string,
  ): Promise<SearchBySlugResult<PostEntity | PostEntity[] | null>> {
    const categoryContent = await new CategoryRepository().getCategoryContent(slug);

    if (categoryContent) {
      return { item: "category", content: categoryContent };
    } else {
      return { item: "news", content: await new PostRepository().getPostBySlug(slug as string) };
    }
  }
}
