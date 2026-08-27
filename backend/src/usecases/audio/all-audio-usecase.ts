import fs from "fs";
import path from "path";

export class AllAudioUseCase {
  
  public async execute() {
    const uploadsDir = path.join(__dirname, "../../../public/audio");
    if (!fs.existsSync(uploadsDir)) {
      return [];
    }
    const files = fs.readdirSync(uploadsDir);
    return files.filter((file) =>
      /\.(mp3|wav|ogg|m4a|aac|webm|flac)$/i.test(file),
    );
  }
}
