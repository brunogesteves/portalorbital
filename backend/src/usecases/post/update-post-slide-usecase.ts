import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";

export class UpdatePostSlideUseCase {
  public async execute(req: Request) {
    const { slide } = req.body;

    if (typeof slide !== "boolean") {
      throw new Error("Status inválido");
    }
    const postRepository = new PostRepository();
    const result = await postRepository.updatePostSlide(req);
    if (!result) {
      throw new Error("Erro ao buscar posts");
    }
    return result;
  }
}
