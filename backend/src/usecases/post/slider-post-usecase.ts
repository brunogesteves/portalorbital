import { PostRepository } from "../../repository/post/post-repository";

export class SliderPostUseCase {
  
  public async execute() {
    const postRepository = new PostRepository();
    const result = await postRepository.getSlides();
    if (!result) {
      throw new Error("Erro ao buscar posts");
    }
    return result;
  }
}
