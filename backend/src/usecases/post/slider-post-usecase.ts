import { PostRepository } from "../../repository/post/post-repository";
import { GetSlidesPresenter } from "../../controllers/post/presenters/get-slide-presenters";
import { PostEntity } from "../../entities/post-entity";

export class SliderPostUseCase {
  public async execute(): Promise<GetSlidesPresenter[]> {
    // const getSlidesEntity = PostEntity.fromGetSlidesDTO();
    const postRepository = new PostRepository();
    const result = await postRepository.getPostsWithSlides();
    if (!result) {
      throw new Error("Erro ao buscar posts");
    }
    return result;
  }
}
