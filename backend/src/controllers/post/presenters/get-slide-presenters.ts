export class GetSlides {
  thumbnail: string | null;
  slug: string;
  title: string;
  constructor(thumbnail: string | null, slug: string, title: string) {
    this.title = title;
    this.thumbnail = thumbnail;
    this.slug = slug;
  }
}
