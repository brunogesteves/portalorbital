import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";
import { slugify } from "../../lib/slug";
import type { TitleExisting } from "../../entities/post/title-entity";


export class CreateUpdatePostUseCase {
    public async execute(req: Request) {

        const { id } = req.params;
        const isEdit = id && id !== "undefined" && id !== "null";


        const { title, content, categoryId, scheduledAt, thumbnailUrl, slide, highlight } = req.body;
        const thumbnail = req.file ? `/images/${req.file.filename}` : thumbnailUrl || null;

        const slug = slugify(title);

        const config = {
            id, title, isEdit
        }

        const postRepository = new PostRepository();
        const existingTitle = await postRepository.findTitle(config as TitleExisting);

        if (!existingTitle) {
            throw new Error("Já existe uma notícia com este título");
        }

        const result = await postRepository.createUpdatePost(content, config as TitleExisting);
        if (!result) {

            throw new Error(isEdit ? "Erro ao atualizar o post" : "Erro ao criar o post");
        }
        return result



    }

}