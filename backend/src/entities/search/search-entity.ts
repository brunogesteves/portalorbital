import type { GetCategories } from "../category/get-category-entity";

export class SearchContent {
  category: GetCategories;
  id: number;
  slug: string;
  createdAt: Date;
  title: string;
  thumbnail: string | null;
  content: string;
  scheduledAt: Date;
  updatedAt: Date;
  status: boolean;
  slide: boolean;
  highlight: boolean;
  categoryId: number;
  authorId: number;
  constructor(
    category: GetCategories,
    id: number,
    slug: string,
    createdAt: Date,
    title: string,
    thumbnail: string | null,
    content: string,
    scheduledAt: Date,
    updatedAt: Date,
    status: boolean,
    slide: boolean,
    highlight: boolean,
    categoryId: number,
    authorId: number,
  ) {
    this.category = category;
    this.id = id;
    this.slug = slug;
    this.createdAt = createdAt;
    this.title = title;
    this.thumbnail = thumbnail;
    this.content = content;
    this.scheduledAt = scheduledAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.slide = slide;
    this.highlight = highlight;
    this.categoryId = categoryId;
    this.authorId = authorId;
  }
}
