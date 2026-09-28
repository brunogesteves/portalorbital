import { UserRole } from "@prisma/client";
import { PostRepository } from "../../repository/post/post-repository";
import { GetStatsProps } from "../../types/get-stats.type";
import { UserEntity } from "../../entities/user/user-entity";

export class GetPostStatsUseCase {
  public async execute(user: UserEntity): Promise<GetStatsProps> {
    if (!user) {
      throw new Error("Não autenticado");
    }
    const whereClause: any = {};

    if (user.role === UserRole.PBR) {
      whereClause.authorId = user.id;
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

    return result;
  }
}
