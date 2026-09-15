import prisma from "../../lib/prisma";

import type { TitleExisting } from "../../controllers/post/presenters/title-presenters";
import type { GetSlidesPresenter } from "../../controllers/post/presenters/get-slide-presenters";
import type { GetHighlightPresenter } from "../../controllers/post/presenters/get-highlight-presenters";
import type { AllPostsFront } from "../../controllers/post/presenters/all-posts-presenter";

import type { UpsertPostEntity } from "../../entities/upsert-post-entity";
import type { PostEntity } from "../../entities/post-entity";

import type { GetPostsPresenter } from "../../controllers/post/presenters/get-post-presenter";
import type { PostContentPresenter } from "../../controllers/post/presenters/post-presenters";

type AllowedFields = "status" | "slide" | "highlight";

export class PostRepository {
  private prisma = prisma;

  public totalPosts(whereClause: any) {
    return this.prisma.post.count({ where: whereClause });
  }

  public totalHighlights(whereClause: any) {
    return this.prisma.post.count({ where: { ...whereClause, highlight: true } });
  }

  public totalActivePosts(whereClause: any) {
    return this.prisma.post.count({ where: { ...whereClause, status: true } });
  }

  public totalSlides(whereClause: any) {
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

  public getPostsWithSlides(): Promise<GetSlidesPresenter[]> {
    return this.prisma.post.findMany({
      where: {
        slide: true,
      },
      select: {
        thumbnail: true,
        slug: true,
        title: true,
      },
    });
  }

  public getHighlightPosts(): Promise<GetHighlightPresenter[]> {
    return this.prisma.post.findMany({
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
  }

  public allPosts(): Promise<AllPostsFront[]> {
    return this.prisma.category.findMany({
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
  }

  public getPostById(id: number) {
    return this.prisma.post.findUnique({
      where: { id: Number(id) },
    });
  }

  // getPostByTitle
  public findTitle(itensTitle: TitleExisting) {
    const { action, id, title } = itensTitle;

    return this.prisma.post.findFirst({
      where: {
        title,
        ...(action === "editPost" && id ? { id: { not: Number(id) } } : {}),
      },
    });
  }

  public upsertPost(postSettings: UpsertPostEntity, itensTitle: TitleExisting) {
    const { action, id, title } = itensTitle;
    const { slug, content, categoryId, scheduledAt, thumbnail, slide, highlight, authorId } =
      postSettings;
    return this.prisma.post.upsert({
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

  public updatePostStatus(
    data: Pick<PostEntity, "id" | "status"> & {
      field: "status" | "slide" | "highlight";
    },
  ) {
    const { status, id, field } = data;
    console.log("status: ", status);
    console.log("id: ", id);
    console.log("field: ", field);
    return this.prisma.post.update({
      where: { id: Number(id) },
      data: { [field]: status },
    });
  }

  public deletePost(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }

  public getPostBySlug(slug: string) {
    const newsContent = this.prisma.post.findFirst({
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
    return newsContent;
  }

  public searchTerm(term: string): Promise<PostContentPresenter | PostContentPresenter[]> {
    return this.prisma.post.findMany({
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
            name: true,
            slug: true,
          },
        },
      },
    });
  }
}
