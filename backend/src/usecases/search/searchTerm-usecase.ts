import { PostEntity } from "../../entities/post/post-entity";
import { PostRepository } from "../../repository/post/post-repository";

export class SearchTermUseCase {
  public async execute(term: string): Promise<PostEntity[]> {
    const searchRepository = new PostRepository();
    return await searchRepository.searchTerm(term);
  }
}
