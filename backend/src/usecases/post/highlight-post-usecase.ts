import { PostRepository } from "../../repository/post/post-repository";

export class HighlightPostsPostUseCase {
  public async execute() {
    const postRepository = new PostRepository();
    const result = await postRepository.getHighlightPosts();
    if (!result) {
      throw new Error("Erro ao buscar posts");
    }
    return result;
  }
}
