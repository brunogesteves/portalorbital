import type { Request } from "express";
import { SearchRepository } from "../../repository/search/search-repository";
import type { SearchContent } from "../../controllers/search/presenters/search-presenters";

export class SearchTermUseCase {
  public async execute(req: Request): Promise<SearchContent[] | undefined> {
    const term = req.query.q as string;
    const searchRepository = new SearchRepository();
    const result = await searchRepository.getSearchContentFromTerm(term);
    return result;
  }
}
