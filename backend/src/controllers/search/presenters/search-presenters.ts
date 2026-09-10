import { GetCategoryContentPresenter } from "../../category/presenters/category-content-presenters";
import type { NewsPresenter } from "../../post/presenters/news.presenter";

export class SearchContentPresenter {
  item: "category" | "news";
  content: GetCategoryContentPresenter | GetCategoryContentPresenter[] | NewsPresenter | null;

  constructor(
    item: "category" | "news",
    content: GetCategoryContentPresenter | GetCategoryContentPresenter[] | NewsPresenter,
  ) {
    this.item = item;
    this.content = content;
  }
}
