import type { PostContentPresenter } from "./post-presenters";

export class GetPostsPresenter {
  posts: PostContentPresenter[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  constructor(
    posts: PostContentPresenter[],
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    },
  ) {
    this.posts = posts;
    this.pagination = pagination;
  }
}
