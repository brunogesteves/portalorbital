import { Role } from "@prisma/client";
import { PostRepository } from "../../repository/post/post-repository";
import type { AuthRequest } from "../../types/auth-request";

export class GetPostStatsUseCase {
  public async execute(req: AuthRequest) {
    if (!req.user) {
      throw new Error("Não autenticado");
    }
    const whereClause: any = {};

    if (req.user.role === Role.PBR) {
      whereClause.authorId = req.user.id;
    }

    const postRepository = new PostRepository();
    const [totalPosts, totalHighlights, totalActivePosts, totalSlides] = await Promise.all([
      postRepository.totalPosts({ where: whereClause }),
      postRepository.totalHighlights({ where: { ...whereClause, highlight: true } }),
      postRepository.totalActivePosts({ where: { ...whereClause, status: true } }),
      postRepository.totalSlides({ where: { ...whereClause, slide: true } }),
    ]);

    const result = {
      totalPosts,
      totalHighlights,
      totalActivePosts,
      totalSlides,
    };

    if (!result) {
      throw new Error("Invalid credentials");
    }
    return result;
  }
}
