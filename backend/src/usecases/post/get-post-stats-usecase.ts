import { Role } from "@prisma/client";
import { PostRepository } from "../../repository/post/post-repository";
import type { AuthRequest } from "../../types/auth-request";
import { GetStatsPresenter } from "../../controllers/post/presenters/getStats.presenter";

export class GetPostStatsUseCase {
  public async execute(req: AuthRequest): Promise<GetStatsPresenter> {
    if (!req.user) {
      throw new Error("Não autenticado");
    }
    const whereClause: any = {};

    if (req.user.role === Role.PBR) {
      whereClause.authorId = req.user.id;
    }

    const postRepository = new PostRepository();
    const [totalPosts, totalHighlights, totalActivePosts, totalSlides] = await Promise.all([
      postRepository.totalPosts(whereClause),
      postRepository.totalHighlights(whereClause),
      postRepository.totalActivePosts(whereClause),
      postRepository.totalSlides(whereClause),
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
