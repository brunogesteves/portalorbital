import type { Request } from "express";
import { SearchRepository } from "../../repository/search/search-repository";

export class NewSCategoryUseCase {

  public async execute(req: Request) {
    const { slug } = req.params;
    const searchRepository = new SearchRepository();
    const result = await searchRepository.getContent(slug as string);

    if (result?.item === "news") {
      return {
        status: true,
        type: "news",
        content: result.content,
      }
    } else if (result?.item === "category") {
      return {
        status: true,
        type: "category",
        content: result.content,
      }
    }
    return { status: false };
  }
}
