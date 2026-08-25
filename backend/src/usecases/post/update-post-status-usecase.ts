import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";

export class UpdatePostStatusUseCase {
  public async execute(req: Request) {
    const { status } = req.body;

    if (typeof status !== "boolean") {
      throw new Error("Status inválido");
    }
    const postRepository = new PostRepository();
    const result = await postRepository.updatePostStatus(req);
    if (!result) {
      throw new Error("Erro ao buscar posts");
    }
    return result;
  }
}
