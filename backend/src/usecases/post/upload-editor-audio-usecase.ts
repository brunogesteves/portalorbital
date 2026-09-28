export class UploadEditorAudioUseCase {
  public async execute(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error("Nenhum áudio enviado");
    }
    const url = `/audio/${file.filename}`;
    return url;
  }
}
