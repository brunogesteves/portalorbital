import type { PostContent } from "../../post/presenters/post-presenters";

export class GetCategoryContentPresenter {
  name: string;
  posts: PostContent[];

  constructor(name: string, posts: PostContent[]) {
    this.name = name;
    this.posts = posts;
  }
}
