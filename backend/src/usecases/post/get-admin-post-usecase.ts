import { PostRepository } from "../../repository/post/post-repository";
import { PaginationRequest, PaginationResult } from "../../types/pagination";
import { PostEntity } from "../../entities/post/post-entity";
import { UserRole } from "../../entities/user/types/user-role";
import { UserEntity } from "../../entities/user/user-entity";
import { GetAdminPostsFilters } from "./params/get-admin-post-params";
import { PostPublished } from "../../entities/post/types/post-published";

export class GetAdminPostUseCase {
  public async execute(
    user: UserEntity,
    pagination: PaginationRequest,
    filters: GetAdminPostsFilters,
    action: "admin" | "pending",
  ): Promise<PaginationResult<PostEntity>> {
    if (!user) {
      throw new Error("Não autenticado");
    }
    const { q, categoryId, authorId, type } = filters;
    const { page = 1, limit = 20 } = pagination;
    const whereClause: any = {};

    if (user.role === UserRole.PBR) {
      whereClause.authorId = user.id;
    }

    if (q) {
      whereClause.OR = [{ title: { contains: String(q) } }, { content: { contains: String(q) } }];
    }

    if (categoryId) {
      whereClause.categoryId = Number(categoryId);
    }

    if (user.role === UserRole.ADM && authorId) {
      whereClause.authorId = Number(authorId);
    }

    if (type === "slide") {
      whereClause.slide = true;
    } else if (type === "destaque") {
      whereClause.highlight = true;
    }

    if (action === "pending") {
      whereClause.published = PostPublished.DRAFT;
    } else if (type === "status") {
      whereClause.published = PostPublished.ACTIVE;
    } else {
      whereClause.published = { in: [PostPublished.UNACTIVE, PostPublished.ACTIVE] };
    }

    const pageNum = sanitizePage(page);
    const limitNum = sanitizeLimit(limit);
    const skip = (pageNum - 1) * limitNum;

    const postRepository = new PostRepository();
    const result = postRepository.getPostsPagination(whereClause, skip, limitNum, pageNum);
    if (!result) {
      throw new Error("Erro ao buscar posts");
    }
    return result;
  }
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const toSafeInt = (value: number, fallback: number, min: number, max?: number) => {
  if (!Number.isFinite(value)) return fallback;
  const truncated = Math.trunc(value);
  const clamped = Math.max(min, truncated);
  return max !== undefined ? Math.min(max, clamped) : clamped;
};

const sanitizePage = (page: number) => toSafeInt(page, DEFAULT_PAGE, 1);

const sanitizeLimit = (limit: number) => toSafeInt(limit, DEFAULT_LIMIT, 1, MAX_LIMIT);
