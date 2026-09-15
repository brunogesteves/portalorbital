import { PostRepository } from "../../repository/post/post-repository";

export class DeletePostUseCase {
  public async execute(id: number): Promise<{ message: string }> {
    const postRepository = new PostRepository();
    const result = await postRepository.deletePost(id);
    if (!result) {
      throw new Error("Post não encontrado");
    }

    // if (req.user.role !== Role.ADM && existingPost.authorId !== req.user.id) {
    //     return res.status(403).json({ message: "Sem permissão para excluir este post" });
    // }

    return { message: "Post excluído" };
  }
}
