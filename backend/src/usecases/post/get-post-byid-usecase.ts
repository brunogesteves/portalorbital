import { PostRepository } from "../../repository/post/post-repository";
import { Role } from "@prisma/client";
import type { AuthRequest } from "../../types/auth-request";

export class GetPostByIdUseCase {
  public async execute(req: AuthRequest) {
    if (!req.user) {
      throw new Error("Não autenticado");
    }
    const { id } = req.params;

    const postRepository = new PostRepository();
    const result = await postRepository.getPostById(id as string);

    if (!result) {
      throw new Error("Post não encontrado");
    }

    if (req.user.role !== Role.ADM && result.authorId !== req.user.id) {
      throw new Error("Sem permissão para visualizar este post");
    }

    return result;
  }
}
