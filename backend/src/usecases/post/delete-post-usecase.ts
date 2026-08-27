import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";

export class DeletePostUseCase {
  
  public async execute(req: Request) {
    const { id } = req.params;
    const postRepository = new PostRepository();
    const result = await postRepository.deletePost(id as string);
    if (!result) {
      throw new Error("Post não encontrado");
    }

    // if (req.user.role !== Role.ADM && existingPost.authorId !== req.user.id) {
    //     return res.status(403).json({ message: "Sem permissão para excluir este post" });
    // }

    return { message: "Post excluído" };
  }
}
