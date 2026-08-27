import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";

export class UpdatePostHighlightUseCase {
  
  public async execute(req: Request) {
    const { highlight } = req.body;

    if (typeof highlight !== "boolean") {
      throw new Error("Destaque inválido");
    }
    const postRepository = new PostRepository();
    const result = await postRepository.updatePostStatus(req);
    if (!result) {
      throw new Error("Erro ao atualizar destaque");
    }
    return result;
  }
}
