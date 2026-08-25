import type { Request } from "express";

export class UploadEditorImageUseCase {
  public async execute(req: Request) {
    if (!req.file) {
      throw new Error("Nenhuma imagem enviada");
    }
    const url = `${req.file.filename}`;

    return { url: `${url}` };
  }
}
