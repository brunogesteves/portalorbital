export class PostEntity {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  slide: boolean;
  highlight: boolean;
  categoryId: number;
  authorId: number;

  constructor(
    id: number,
    title: string,
    slug: string,
    thumbnail: string,
    content: string,
    scheduledAt: Date,
    createdAt: Date,
    updatedAt: Date,
    status: boolean,
    slide: boolean,
    highlight: boolean,
    categoryId: number,
    authorId: number
  ) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.thumbnail = thumbnail;
    this.content = content;
    this.scheduledAt = scheduledAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.slide = slide;
    this.highlight = highlight;
    this.categoryId = categoryId;
    this.authorId = authorId;
  }
}
