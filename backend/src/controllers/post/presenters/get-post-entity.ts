import type { PostContent } from "./post-entity";

export class GetPosts {
  posts: PostContent[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  constructor(
    posts: PostContent[],
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
