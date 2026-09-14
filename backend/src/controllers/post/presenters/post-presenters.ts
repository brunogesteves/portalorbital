export class PostContentPresenter {
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

  constructor(params: {
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
  }) {
    this.id = params.id;
    this.slug = params.slug;
    this.createdAt = params.createdAt;
    this.title = params.title;
    this.thumbnail = params.thumbnail;
    this.content = params.content;
    this.scheduledAt = params.scheduledAt;
    this.updatedAt = params.updatedAt;
    this.status = params.status;
    this.slide = params.slide;
    this.highlight = params.highlight;
    this.categoryId = params.categoryId;
    this.authorId = params.authorId;
  }
}
