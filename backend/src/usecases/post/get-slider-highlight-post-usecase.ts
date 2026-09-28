import { PostEntity } from "../../entities/post/post-entity";
import { SlidesOrHighlightPosts } from "../../entities/post/types/post-slides-or-highlightPosts";
import { PostRepository } from "../../repository/post/post-repository";

export class GetSliderOrHighlightPostsUseCase {
  public async execute(field: SlidesOrHighlightPosts): Promise<PostEntity[]> {
    const postRepository = new PostRepository();
    const result = await postRepository.getPostsWithSlidesOrHighlightPosts(field);

    return result;
  }
}
