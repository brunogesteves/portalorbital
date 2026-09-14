import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";
import type { SearchTermDTO } from "../../controllers/search/dtos/search-term.dto";

export class SearchTermUseCase {
  public async execute(dto: SearchTermDTO) {
    const { term } = dto;

    const searchRepository = new PostRepository();
    return await searchRepository.searchTerm(term);
  }
}
