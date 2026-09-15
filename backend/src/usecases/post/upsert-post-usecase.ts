import { PostRepository } from "../../repository/post/post-repository";
import { slugify } from "../../lib/slug";
import type { TitleExisting } from "../../controllers/post/presenters/title-presenters";
import type { AuthRequest } from "../../types/auth-request";
import { UpsertPostEntity } from "../../entities/upsert-post-entity";
import { UpsertPostPresenter } from "../../controllers/post/presenters/upsert-post-presenters";
export class UpsertPostUseCase {
  public async execute(req: AuthRequest): Promise<UpsertPostPresenter> {
    if (!req.user) {
      throw new Error("Não autenticado");
    }
    const { id } = req.params;
    const { title, content, categoryId, scheduledAt, thumbnailUrl, action } = req.body;
    const slide = req.body.slide === "true" || req.body.slide === true;
    const highlight = req.body.highlight === "true" || req.body.highlight === true;
    const thumbnail = req.file ? `/images/${req.file.filename}` : thumbnailUrl || null;

    const slug = slugify(title);

    const itensTitle = {
      id,
      title,
      action,
    };
    const postRepository = new PostRepository();
    if (action === "createPost") {
      const existingTitle = await postRepository.findTitle(itensTitle as TitleExisting);

      if (existingTitle) {
        throw new Error("Já existe uma notícia com este título");
      }
    }
    const upsertEntity = new UpsertPostEntity({
      slug,
      content,
      categoryId,
      scheduledAt,
      thumbnail,
      slide,
      highlight,
      authorId: req.user.id,
    });
    const result = await postRepository.upsertPost(upsertEntity, itensTitle as TitleExisting);
    if (!result) {
      throw new Error(action === "editPost" ? "Erro ao atualizar o post" : "Erro ao criar o post");
    }
    return result;
  }
}
