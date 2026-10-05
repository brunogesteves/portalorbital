import { PostRepository } from "../../repository/post/post-repository";
import { slugify } from "../../lib/slug";
import { UserEntity } from "../../entities/user/user-entity";
import { PostBody } from "./body/get-admin-post-body";
import { PostEntity } from "../../entities/post/post-entity";
import { PostPublished } from "@prisma/client";
export class UpsertPostUseCase {
  public async execute(
    user: UserEntity,
    data: PostEntity,
    file: Express.Multer.File | undefined,
    action: "createPost" | "editPost",
  ): Promise<PostEntity> {
    if (!user) {
      throw new Error("Não autenticado");
    }

    const postRepository = new PostRepository();

    const id = Number(data.id);
    const currentPost = action === "editPost" && id ? await postRepository.getPostById(id) : null;

    if (action === "editPost" && !currentPost) {
      throw new Error("Notícia não encontrada");
    }

    const title = data.title?.trim() ? data.title : (currentPost?.title ?? "");

    if (!title) {
      throw new Error("O título é obrigatório");
    }

    const existingTitle = await postRepository.findTitle(
      title,
      action === "editPost" ? id : undefined,
    );

    if (existingTitle) {
      throw new Error("Já existe uma notícia com este título");
    }

    const postSettings = new PostEntity({
      id: action === "editPost" ? id : Number(data.id),
      title,
      slug: slugify(title),
      thumbnail: file ? `/images/${file.filename}` : data.thumbnail || currentPost?.thumbnail || null,
      content: data.content,
      scheduledAt: new Date(data.scheduledAt!),
      createdAt: currentPost?.createdAt ?? new Date(),
      updatedAt: new Date(),
      published:
        action === "editPost"
          ? data.published === undefined
            ? undefined
            : data.published === "ACTIVE"
              ? PostPublished.ACTIVE
              : PostPublished.UNACTIVE
          : PostPublished.DRAFT,
      slide: Boolean(data.slide),
      highlight: Boolean(data.highlight),
      categoryId: Number(data.categoryId),
      authorId: Number.isFinite(Number(data.authorId))
        ? Number(data.authorId)
        : (currentPost?.authorId ?? user.id!),
    });
    const result = await postRepository.upsertPost(postSettings);

    if (!result) {
      throw new Error(action === "editPost" ? "Erro ao atualizar o post" : "Erro ao criar o post");
    }
    return result;
  }
}
