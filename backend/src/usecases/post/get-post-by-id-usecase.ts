import { PostRepository } from "../../repository/post/post-repository";
import type { AuthRequest } from "../../types/auth-request";
import type { PostContentPresenter } from "../../controllers/post/presenters/post-presenters";
import { Role } from "@prisma/client";

export class GetPostByIdUseCase {
  public async execute(id: number, req: AuthRequest): Promise<PostContentPresenter> {
    if (!req.user) {
      throw new Error("Não autenticado");
    }

    const postRepository = new PostRepository();
    const result = await postRepository.getPostById(id);

    if (!result) {
      throw new Error("Post não encontrado");
    }

    if (req.user.role !== Role.ADM && result.authorId !== req.user.id) {
      throw new Error("Sem permissão para visualizar este post");
    }

    return result;
  }
}
