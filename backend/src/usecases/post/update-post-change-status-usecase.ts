import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";
import { PostEntity } from "../../entities/post-entity";

export class UpdatePostChangeStatusUseCase {
  public async execute(req: Request) {
    const { status, field } = req.body;
    const { id } = req.params;

    const updatePostSlideEntity = PostEntity.fromStatusPostDTO(Number(id), status, field);
    const postRepository = new PostRepository();
    return await postRepository.updatePostStatus(updatePostSlideEntity);
  }
}
