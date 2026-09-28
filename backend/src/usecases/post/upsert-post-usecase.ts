import { PostRepository } from "../../repository/post/post-repository";
import { slugify } from "../../lib/slug";
import { UserEntity } from "../../entities/user/user-entity";
import { PostBody } from "./body/get-admin-post-body";
import { PostEntity } from "../../entities/post/post-entity";
import { PostPublished } from "@prisma/client";
export class UpsertPostUseCase {
  public async execute(
    user: UserEntity,
    postContent: PostEntity,
    action: string,
  ): Promise<PostEntity> {
    if (!user) {
      throw new Error("Não autenticado");
    }
    const {
      slide,
      highlight,
      published,
      scheduledAt,
      content,
      id,
      title,
      authorId,
      categoryId,
      thumbnail,
      updatedAt,
      createdAt,
    } = postContent;
    // console.log("postContent highlight: ", typeof postContent.highlight);
    // console.log("postContent slide: ", postContent.slide);
    const oi = "true";
    const isSlide = oi === "true" ? true : false;

    const postRepository = new PostRepository();
    if (action === "createPost") {
      const existingTitle = await postRepository.findTitle(
        action,
        Number(postContent.id),
        postContent.title as string,
      );

      if (existingTitle) {
        throw new Error("Já existe uma notícia com este título");
      }
    }
    const postSettings = new PostEntity({
      id: Number(id),
      title,
      slug: slugify(title!),
      thumbnail,
      content,
      scheduledAt: new Date(scheduledAt!),
      createdAt: createdAt!,
      updatedAt: new Date(updatedAt!),
      published:
        action === "editPost"
          ? published === "ACTIVE"
            ? PostPublished.ACTIVE
            : PostPublished.UNACTIVE
          : PostPublished.DRAFT,
      slide: Boolean(slide),
      highlight: Boolean(highlight),
      categoryId: Number(categoryId),
      authorId: Number(authorId),
    });
    const result = await postRepository.upsertPost(postSettings);
    if (!result) {
      throw new Error(action === "editPost" ? "Erro ao atualizar o post" : "Erro ao criar o post");
    }
    return result;
  }
}
