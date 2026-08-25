import type { Request } from "express";

export class UploadEditorAudioUseCase {
    public async execute(req: Request) {
        if (!req.file) {
            throw new Error("Nenhum áudio enviado");
        }
        const url = `/audio/${req.file.filename}`;
        return { url };
    }

}