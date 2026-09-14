import type { PostContentPresenter } from "../../post/presenters/post-presenters";

export class GetCategoryContentPresenter {
  name: string;
  posts: PostContentPresenter[];

  constructor(params: { name: string; posts: PostContentPresenter[] }) {
    this.name = params.name;
    this.posts = params.posts;
  }
}
