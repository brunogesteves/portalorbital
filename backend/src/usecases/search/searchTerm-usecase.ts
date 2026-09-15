import { PostRepository } from "../../repository/post/post-repository";

export class SearchTermUseCase {
  public async execute(term: string) {
    const searchRepository = new PostRepository();
    return await searchRepository.searchTerm(term);
  }
}
