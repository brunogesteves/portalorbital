import type { TitleExisting } from "../../controllers/post/presenters/title-presenters";
import type { GetPostsPresenter } from "../../controllers/post/presenters/get-post-presenter";
import type { GetSlides } from "../../controllers/post/presenters/get-slide-presenters";
import type { GetHighlightPresenter } from "../../controllers/post/presenters/get-highlight-presenters";
import type { AllPostsFront } from "../../controllers/post/presenters/all-posts-presenter";
import prisma from "../../lib/prisma";
import type { UpsertPostEntity } from "../../entities/upsert-post-entity";
import type { PostEntity } from "../../entities/post-entity";
import type { SearchContentPresenter } from "../../controllers/search/presenters/search-presenters";
import { PostContent } from "../../controllers/post/presenters/post-presenters";

type AllowedFields = "status" | "slide" | "highlight";

export class PostRepository {
  private prisma = prisma;

  // TODO: Separar cada query em um metodo diferente, respeitado o nome conforme ele retorna:
  // Ex.: getStatsPosts, getStatsHighlights, getStatsActivePosts, getStatsSlides
  // E deixar essa promise no usecase
  //feito

  public async totalPosts(whereClause: any) {
    return await this.prisma.post.count({ where: whereClause });
  }

  public async totalHighlights(whereClause: any) {
    return this.prisma.post.count({ where: { ...whereClause, highlight: true } });
  }

  public async totalActivePosts(whereClause: any) {
    return this.prisma.post.count({ where: { ...whereClause, status: true } });
  }

  public async totalSlides(whereClause: any) {
    return this.prisma.post.count({ where: { ...whereClause, slide: true } });
  }

  // Evitaria deixar o whereClause como parametro. Melhor criar um metodo para cada where necessario
  //nãp entendi
  public async getPosts(
    whereClause: any,
    skip: number,
    limitNum: number,
    pageNum: number,
  ): Promise<GetPostsPresenter> {
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where: whereClause,
        include: {
          category: true,
          author: {
            select: { name: true, email: true, role: true },
          },
        },
        orderBy: { scheduledAt: "desc" },
        skip,
        take: limitNum,
      }),
      this.prisma.post.count({ where: whereClause }),
    ]);

    return {
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  // TODO: Talvez o nome mais claro seja getPostsWithSlides
  //feito
  public async getPostsWithSlides(): Promise<GetSlides[]> {
    const slides = await this.prisma.post.findMany({
      where: {
        slide: true,
      },
      select: {
        thumbnail: true,
        slug: true,
        title: true,
      },
    });
    return slides;
  }

  // TODO: getHighlightPosts
  //feito
  public async getHighlightPosts(): Promise<GetHighlightPresenter[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        highlight: true,
      },
      select: {
        id: true,
        thumbnail: true,
        slug: true,
        title: true,
      },
    });
    return posts;
  }

  public async allPosts(): Promise<AllPostsFront[]> {
    const allPosts = await this.prisma.category.findMany({
      where: {
        posts: {
          some: {
            slide: false,
            highlight: false,
          },
        },
      },
      include: {
        posts: {
          where: {
            slide: false,
            highlight: false,
          },
          take: 4,
          orderBy: {
            createdAt: "desc",
          },
          omit: {
            createdAt: true,
            updatedAt: true,
            status: true,
            scheduledAt: true,
            slide: true,
          },
          include: {
            author: {
              select: {
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });
    return allPosts;
  }

  public async getPostById(id: string) {
    const uniquePost = await this.prisma.post.findUnique({
      where: { id: Number(id) },
    });
    return uniquePost;
  }

  public async findTitle(itensTitle: TitleExisting) {
    const { action, id, title } = itensTitle;

    const existingTitle = await this.prisma.post.findFirst({
      where: {
        title,
        ...(action === "editPost" && id ? { id: { not: Number(id) } } : {}),
      },
    });
    return existingTitle;
  }

  // TODO: Pode remover o Post do nome. Acho meio redundante, ja que esta no repository de Posts
  //feito
  public async upsertPost(postSettings: UpsertPostEntity, itensTitle: TitleExisting) {
    const { action, id, title } = itensTitle;
    const { slug, content, categoryId, scheduledAt, thumbnail, slide, highlight, authorId } =
      postSettings;
    return await this.prisma.post.upsert({
      where: { id: action === "editPost" ? Number(id) : 0 },
      update: {
        title,
        slug,
        content,
        categoryId: Number(categoryId),
        scheduledAt: new Date(scheduledAt),
        ...(thumbnail && { thumbnail }),
        ...(slide !== undefined && { slide: slide === true }),
        ...(highlight !== undefined && { highlight: highlight === true }),
      },
      create: {
        title,
        slug,
        content,
        thumbnail,
        scheduledAt: new Date(scheduledAt),
        categoryId: Number(categoryId),
        authorId,
        status: false,
        slide: slide === true,
        highlight: highlight === true,
      },
    });
  }

  // TODO: Pode remover o Post do nome
  //feito
  public async updatePostStatus(
    data: Pick<PostEntity, "id" | "status"> & {
      field: "status" | "slide" | "highlight";
    },
  ) {
    const { status, id, field } = data;
    return await this.prisma.post.update({
      where: { id: Number(id) },
      data: { [field]: status },
    });
  }

  // TODO: Pode remover o Post do nome
  //feito
  public async deletePost(id: string) {
    return await this.prisma.post.delete({
      where: { id: Number(id) },
    });
  }

  public async getNewsContent(slug: string) {
    const newsContent = await this.prisma.post.findFirst({
      where: {
        slug,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        thumbnail: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log("pega do repositorio: ", newsContent);
    return newsContent;
  }

  public async searchTerm(term: string): Promise<PostContent[]> {
    const getPostsResults = await this.prisma.post.findMany({
      where: {
        OR: [
          {
            content: {
              contains: term,
            },
          },
          {
            title: {
              contains: term,
            },
          },
          {
            slug: {
              contains: term,
            },
          },
        ],
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return getPostsResults;
  }
}
