export class GetSlidesPresenter {
  thumbnail: string | null;
  slug: string;
  title: string;
  constructor(params: { thumbnail: string | null; slug: string; title: string }) {
    this.title = params.title;
    this.thumbnail = params.thumbnail;
    this.slug = params.slug;
  }
}
