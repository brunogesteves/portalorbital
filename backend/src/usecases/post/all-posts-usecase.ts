import { PostRepository } from "../../repository/post/post-repository";


export class AllPostsPostUseCase {
    public async execute() {
        const postRepository = new PostRepository();
        const result = await postRepository.allPosts();
        if (!result) {
            throw new Error("Erro ao buscar posts");
        }
        return result;
    }

}