import type { Request } from "express";
import type { SearchContentPresenter } from "../../controllers/search/presenters/search-presenters";
import { CategoryRepository } from "../../repository/category/category-repository";
import { PostRepository } from "../../repository/post/post-repository";

export class NewSCategoryUseCase {
  public async execute(req: Request): Promise<SearchContentPresenter> {
    const { slug } = req.params;

    const categoryContent = await new CategoryRepository().getCategoryContent(slug as string);

    if (categoryContent) {
      return { item: "category", content: categoryContent };
    } else {
      return { item: "news", content: await new PostRepository().getNewsContent(slug as string) };
    }
  }
}
