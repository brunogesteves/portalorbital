import type { PostEntity } from "../post-entity";

export interface CategoryWithPosts {
  id: number;
  name: string;
  slug: string;
  posts: PostEntity[];
}
