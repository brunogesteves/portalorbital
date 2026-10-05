import { UserRole } from "@prisma/client";
import { PostRepository } from "../../repository/post/post-repository";
import { GetStatsProps } from "../../types/get-stats.type";
import { UserEntity } from "../../entities/user/user-entity";

export class GetPostStatsUseCase {
  public async execute(user: UserEntity): Promise<GetStatsProps> {
    if (!user) {
      throw new Error("Não autenticado");
    }
    let authorId: number | undefined = undefined;

    if (user.role === UserRole.PBR) {
      authorId = user.id;
    }

    const postRepository = new PostRepository();
    const [
      getPostsCategorized,
      slideAndHighlightPostsAtTheSameTime,
      totalHighlights,
      totalActivePosts,
      totalSlides,
    ] = await Promise.all([
      postRepository.getPostsCategorized(),
      postRepository.getPostsAtTheSameTime(),
      postRepository.totalHighlights(authorId),
      postRepository.totalActivePosts(authorId),
      postRepository.totalSlides(authorId),
    ]);

    const result = {
      getPostsCategorized,
      slideAndHighlightPostsAtTheSameTime,
      totalHighlights,
      totalActivePosts,
      totalSlides,
    };

    return result;
  }
}
