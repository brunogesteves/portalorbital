import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";

import { UpdatePostChangeStatusDTO } from "../../types/update-post-change-status-dto";

export class UpdatePostChangeStatusUseCase {
  public async execute(data: UpdatePostChangeStatusDTO) {
    const { id, field, status } = data;

    const postRepository = new PostRepository();
    const result = await postRepository.updatePostStatus(id, field, status);
    return result;
  }
}
