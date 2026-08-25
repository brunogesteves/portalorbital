import type { PostContent } from "../post/post-entity";

export class GetCategoryContent {
  name: string;
  posts: PostContent[];

  constructor(name: string, posts: PostContent[]) {
    this.name = name;
    this.posts = posts;
  }
}
