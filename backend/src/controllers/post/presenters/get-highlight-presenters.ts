export class GetHighlightPresenter {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  constructor(params: { id: number; title: string; slug: string; thumbnail: string | null }) {
    this.id = params.id;
    this.title = params.title;
    this.thumbnail = params.thumbnail;
    this.slug = params.slug;
  }
}
