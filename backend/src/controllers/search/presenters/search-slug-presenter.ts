import { GetCategoryContentPresenter } from "../../category/presenters/get-category-content-presenters";
import type { NewsPresenter } from "../../post/presenters/news.presenter";

export class SearchSlugPresenter {
  item: "category" | "news";
  content: GetCategoryContentPresenter | GetCategoryContentPresenter[] | NewsPresenter | null;

  constructor(params: {
    item: "category" | "news";
    content: GetCategoryContentPresenter | GetCategoryContentPresenter[] | NewsPresenter;
  }) {
    this.item = params.item;
    this.content = params.content;
  }
}
