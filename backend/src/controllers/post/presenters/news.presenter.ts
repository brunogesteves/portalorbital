export class NewsPresenter {
  id: number;
  slug: string;
  createdAt: Date;
  title: string;
  thumbnail: string | null;
  content: string;
  author: { name: string | null };
  constructor(
    id: number,
    title: string,
    slug: string,
    content: string,
    thumbnail: string | null,
    createdAt: Date,
    author: { name: string | null },
  ) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.content = content;
    this.thumbnail = thumbnail;
    this.createdAt = createdAt;
    this.author = author;
  }
}
