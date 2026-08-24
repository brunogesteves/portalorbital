import type { Request } from "express";


export class SearchTermUseCase {
    public async execute(req: Request): Promise<string> {
        const { email, password } = req.body;

        const searchRepository = new SearchRepository();
        const result = await searchRepository.findByEmail(email);
        return result
    }
}
