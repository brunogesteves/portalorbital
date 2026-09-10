import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";

export class SearchTermUseCase {
  public async execute(req: Request) {
    const term = req.query.term as string;
    const searchRepository = new PostRepository();
    return await searchRepository.searchTerm(term);

    // if (result?.item === "news") {
    //   return {
    //     status: true,
    //     type: "news",
    //     content: result.content,
    //   };
    // } else if (result?.item === "category") {
    //   return {
    //     status: true,
    //     type: "category",
    //     content: result.content,
    //   };
    // }
    // return { status: false };
  }
}
