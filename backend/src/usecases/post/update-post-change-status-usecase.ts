import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";
import { PostEntity } from "../../entities/post-entity";

export class UpdatePostChangeStatusUseCase {

  public async execute(req: Request) {
    const { status, field } = req.body;
    const { id } = req.params;

     const updatePostSlide = PostEntity.fromStatus({ id:Number(id), status, field });

    const postRepository = new PostRepository();
    const result = await postRepository.updatePostStatus(updatePostSlide);
    if (!result) {
      throw new Error("Erro ao buscar posts");
    }
    return result;
  }
}
