import { PostRepository } from "../../repository/post/post-repository";
import { UserEntity } from "../../entities/user/user-entity";
import { UserRole } from "../../entities/user/types/user-role";
import { PostEntity } from "../../entities/post/post-entity";

export class GetPostByIdUseCase {
  public async execute(user: UserEntity, id: number): Promise<PostEntity> {
    if (!user) {
      throw new Error("Não autenticado");
    }

    const postRepository = new PostRepository();
    const result = await postRepository.getPostById(id);

    if (!result) {
      throw new Error("Post não encontrado");
    }

    if (user.role !== UserRole.ADM && result.authorId !== user.id) {
      throw new Error("Sem permissão para visualizar este post");
    }

    return result;
  }
}
