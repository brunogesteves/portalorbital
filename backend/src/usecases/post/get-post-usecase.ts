import { Role } from "@prisma/client";
import { PostRepository } from "../../repository/post/post-repository";
import type { AuthRequest } from "../../types/auth-request";

export class GetPostUseCase {
  
  public async execute(req: AuthRequest) {
    if (!req.user) {
      throw new Error("Não autenticado");
    }
    const { q, page = "1", limit = "20", categoryId, authorId, type } = req.query;
    const whereClause: any = {};

    // Regra: PBR só vê os seus, ADM vê todos
    if (req.user.role === Role.PBR) {
      whereClause.authorId = req.user.id;
    }

    if (q) {
      whereClause.OR = [{ title: { contains: String(q) } }, { content: { contains: String(q) } }];
    }

    if (categoryId) {
      whereClause.categoryId = Number(categoryId);
    }

    // Se for ADM, permite filtrar por authorId passado na query
    if (req.user.role === Role.ADM && authorId) {
      whereClause.authorId = Number(authorId);
    }

    if (type === "slide") {
      whereClause.slide = true;
    } else if (type === "status") {
      whereClause.status = true;
    } else if (type === "destaque") {
      whereClause.highlight = true;
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const postRepository = new PostRepository();
    const result = postRepository.getPosts(whereClause, skip, limitNum, pageNum);
    if (!result) {
      throw new Error("Erro ao buscar posts");
    }
    return result;
  }
}
