import type { TitleExisting } from "../../controllers/post/presenters/title-presenters";
import type { GetPosts } from "../../controllers/post/presenters/get-post-presenters";
import type { GetSlides } from "../../controllers/post/presenters/get-slide-presenters";
import type { GetHighlightPresenter } from "../../controllers/post/presenters/get-highlight-presenters";
import type { AllPostsFront } from "../../controllers/post/presenters/all-posts-presenter";
import prisma from "../../lib/prisma";
import type { UpsertPostEntity } from "../../entities/upsert-post-entity";
import type { PostEntity } from "../../entities/post-entity";

type AllowedFields = "status" | "slide" | "highlight";

export class PostRepository {
  private prisma = prisma;

  // TODO: Separar cada query em um metodo diferente, respeitado o nome conforme ele retorna:
  // Ex.: getStatsPosts, getStatsHighlights, getStatsActivePosts, getStatsSlides
  // E deixar essa promise no usecase
  public async stats(whereClause: any) {
    const [totalPosts, totalHighlights, totalActivePosts, totalSlides] = await Promise.all([
      this.prisma.post.count({ where: whereClause }),
      this.prisma.post.count({ where: { ...whereClause, highlight: true } }),
      this.prisma.post.count({ where: { ...whereClause, status: true } }),
      this.prisma.post.count({ where: { ...whereClause, slide: true } }),
    ]);

    return {
      totalPosts,
      totalHighlights,
      totalActivePosts,
      totalSlides,
    };
  }

  // Evitaria deixar o whereClause como parametro. Melhor criar um metodo para cada where necessario
  public async getPosts(whereClause: any, skip: number, limitNum: number, pageNum: number): Promise<GetPosts> {
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
  public async getSlides(): Promise<GetSlides[]> {
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
  public async highlightPosts(): Promise<GetHighlightPresenter[]> {
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
  public async upsertPost(postSettings: UpsertPostEntity, itensTitle: TitleExisting) {
    const { action, id, title } = itensTitle;
    const { slug, content, categoryId, scheduledAt, thumbnail, slide, highlight, authorId } = postSettings;
    const upsertPost = await this.prisma.post.upsert({
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
    return upsertPost;
  }

  // TODO: Pode remover o Post do nome
  public async updatePostStatus(
    data: Pick<PostEntity, "id" | "status"> & {
      field: "status" | "slide" | "highlight";
    }
  ) {
    const { status, id, field } = data;
    const post = await this.prisma.post.update({
      where: { id: Number(id) },
      data: { [field]: status },
    });

    return post;
  }

  // public async updatePostSlide(data: Pick<PostEntity,"id" | "slide">) {

  //   const {slide, id} = data
  //   const post = await this.prisma.post.update({
  //     where: { id: Number(id) },
  //     data: { slide:!slide },
  //   });

  //   return post;
  // }

  // TODO: Pode remover o Post do nome
  public async deletePost(id: string) {
    const existingPost = await this.prisma.post.delete({
      where: { id: Number(id) },
    });
    return existingPost;
  }
}
