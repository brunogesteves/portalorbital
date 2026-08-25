import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";
import { Role } from "@prisma/client";

export class GetPostByIdUseCase {
    public async execute(req: Request) {
        const { id } = req.params;

        const postRepository = new PostRepository();
        const result = await postRepository.getPostById(id as string);

        if (!result) {
            throw new Error("Post não encontrado");
        }


        if (req.user.role !== Role.ADM && result.authorId !== req.user.id) {
            throw new Error("Sem permissão para visualizar este post");
        }

        return result;



    }

}