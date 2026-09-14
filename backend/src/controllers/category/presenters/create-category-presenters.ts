export class CreateCategoryPresenter {
  name: string;
  slug: string;

  constructor(params: { name: string; slug: string }) {
    this.name = params.name;
    this.slug = params.slug;
  }
}
