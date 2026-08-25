import { Role } from "@prisma/client";
import { PostRepository } from "../../repository/post/post-repository";
import type { AuthRequest } from "../../types/auth-request";

export class GetPostStatsUseCase {
  public async execute(req: AuthRequest) {
    if (!req.user) {
      throw new Error("Não autenticado");
    }
    const whereClause: any = {};

    // Regra: PBR só vê os seus, ADM vê todos
    if (req.user.role === Role.PBR) {
      whereClause.authorId = req.user.id;
    }

    const postRepository = new PostRepository();
    const result = postRepository.stats(whereClause);

    if (!result) {
      throw new Error("Invalid credentials");
    }
    return result;
  }
}
