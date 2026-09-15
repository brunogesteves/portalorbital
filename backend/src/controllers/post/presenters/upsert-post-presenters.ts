export class UpsertPostPresenter {
  slug: string;
  content: string;
  categoryId: number;
  scheduledAt: Date;
  thumbnail: string | null;
  slide: boolean;
  highlight: boolean;
  authorId: number;

  constructor(params: {
    slug: string;
    content: string;
    categoryId: number;
    scheduledAt: Date;
    thumbnail: string | null;
    slide: boolean;
    highlight: boolean;
    authorId: number;
  }) {
    this.slug = params.slug;
    this.thumbnail = params.thumbnail;
    this.content = params.content;
    this.scheduledAt = params.scheduledAt;
    this.slide = params.slide;
    this.highlight = params.highlight;
    this.categoryId = params.categoryId;
    this.authorId = params.authorId;
  }
}
