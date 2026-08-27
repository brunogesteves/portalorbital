import type { Request } from "express";
import { SearchRepository } from "../../repository/search/search-repository";
import type { SearchContent } from "../../controllers/search/presenters/search-presenters";

export class SearchTermUseCase {
  
  public async execute(req: Request): Promise<SearchContent[]> {
    const term = req.query.term as string;

    const searchRepository = new SearchRepository();
    const result = await searchRepository.searchTerm(term);
    return result;
  }
}
