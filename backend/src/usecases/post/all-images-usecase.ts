import fs from "fs";
import path from "path";
export class AllImagesPostUseCase {
  public async execute() {
    const uploadsDir = path.join(__dirname, "../../public/images");
    if (!fs.existsSync(uploadsDir)) {
      return [];
    }
    const files = fs.readdirSync(uploadsDir);
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file) => `${file}`);
    if (images) {
      throw new Error("Erro ao listar imagens");
    }
    return { images };
  }
}
