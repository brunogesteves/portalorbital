export class GetStatsPresenter {
  totalPosts: number;
  totalHighlights: number;
  totalActivePosts: number;
  totalSlides: number;

  constructor(params: {
    totalPosts: number;
    totalHighlights: number;
    totalActivePosts: number;
    totalSlides: number;
  }) {
    this.totalPosts = params.totalPosts;
    this.totalHighlights = params.totalHighlights;
    this.totalActivePosts = params.totalActivePosts;
    this.totalSlides = params.totalSlides;
  }
}
