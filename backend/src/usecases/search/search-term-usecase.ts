import type { Request } from "express";
import { SearchRepository } from "../../repository/search/search-repository";
import type { SearchContent } from "../../entities/search/search-entity";


export class SearchTermUseCase {
    public async execute(req: Request): Promise<SearchContent[]> {
        const { term } = req.params;

        const searchRepository = new SearchRepository();
        const result = await searchRepository.searchTerm(term as string);
        return result
    }
}
