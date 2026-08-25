import type { Request } from "express";
import { PostRepository } from "../../repository/post/post-repository";
import path from "path";
import fs from "fs";

export class DeleteImageUseCase {
  public async execute(req: Request) {
    const filename = String(req.params.filename);

    const postRepository = new PostRepository();
    const result = await postRepository.veriricationImage(filename);
    if (result) {
      throw new Error(`Imagem sendo usada como capa do post ou em conteúdo "${result?.title}"`);
    }

    const filePath = path.join(__dirname, "../../public/images", filename);
    if (!fs.existsSync(filePath)) {
      throw new Error("Imagem não encontrada");
    }

    fs.unlinkSync(filePath);
    throw new Error("Imagem excluída com sucesso");
  }
}
