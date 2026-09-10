import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";

export class SearchTermUseCase {
  public async execute(req: Request) {
    const { term } = req.params;

    const searchRepository = new PostRepository();
    return await searchRepository.searchTerm(term as string);
  }
}
