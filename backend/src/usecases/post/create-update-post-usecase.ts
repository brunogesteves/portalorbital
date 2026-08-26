import { PostRepository } from "../../repository/post/post-repository";
import { slugify } from "../../lib/slug";
import type { TitleExisting } from "../../entities/post/title-entity";
import type { AuthRequest } from "../../types/auth-request";

export class CreateUpdatePostUseCase {
  public async execute(req: AuthRequest) {
    if (!req.user) {
      throw new Error("Não autenticado");
    }
    const { id } = req.params;
    const { title, content, categoryId, scheduledAt, thumbnailUrl, slide, highlight, action } = req.body;
    const thumbnail = req.file ? `/images/${req.file.filename}` : thumbnailUrl || null;

    const slug = slugify(title);

    const itensTitle = {
      id,
      title,
      action,
    };
    const postSettings = {
      slug,
      content,
      categoryId,
      scheduledAt,
      thumbnail,
      slide,
      highlight,
      authorId: req.user.id,
    };

    const postRepository = new PostRepository();
    if (action === "createPost") {
      const existingTitle = await postRepository.findTitle(itensTitle as TitleExisting);

      if (!existingTitle) {
        throw new Error("Já existe uma notícia com este título");
      }
    }


    const result = await postRepository.createUpdatePost(postSettings, itensTitle as TitleExisting);
    if (!result) {
      throw new Error(action === "editPost" ? "Erro ao atualizar o post" : "Erro ao criar o post");
    }
    return result;
  }
}
