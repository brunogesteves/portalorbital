import { CategoryWithPosts } from "../../entities/post/types/category-with-posts";
import { PostRepository } from "../../repository/post/post-repository";

export class GetAllFrontPostsPostUseCase {
  public async execute(): Promise<CategoryWithPosts[]> {
    const postRepository = new PostRepository();
    const result = await postRepository.allFrontPosts();
    return result;
  }
}
