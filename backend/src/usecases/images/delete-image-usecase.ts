import type { Request } from "express";
import path from "path";
import fs from "fs";
import { ImageRepository } from "../../repository/image/image-repository";

export class DeleteImageUseCase {
  public async execute(req: Request) {
    const { filename } = req.params;

    const imageRepository = new ImageRepository();

    const result =
      (await imageRepository.veriricationImage(filename as string)) ||
      (await imageRepository.getPostByHasContent(filename as string));
    if (result) {
      return `Imagem sendo usada como capa do post ou em conteúdo "${result?.title}"`;
    }

    const filePath = path.join(__dirname, "../../../public/images", filename as string);
    if (!fs.existsSync(filePath)) {
      return "Imagem não encontrada";
    }

    fs.unlinkSync(filePath);
    return "Imagem excluída com sucesso";
  }
}
