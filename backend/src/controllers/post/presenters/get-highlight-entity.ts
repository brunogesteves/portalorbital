export class GetHighlight {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  constructor(id: number, title: string, slug: string, thumbnail: string | null) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.slug = slug;
  }
}
