import prisma from "../../lib/prisma";

import { TitleExisting } from "../../controllers/post/presenters/title-presenters";

import { PostEntity } from "../../entities/post/post-entity";

import { PostField } from "../../entities/post/types/post-field";
import { PaginationResult } from "../../types/pagination";
import {
  CategoryWithAuthorPostsRelations,
  PostWithAuthorRelations,
  PostWithCategoryAuthorRelations,
  PostWithCategoryRelations,
} from "../../entities/post/types/post-with-relations";
import { PostPublished } from "@prisma/client";
import { SlidesOrHighlightPosts } from "../../entities/post/types/post-slides-or-highlightPosts";

export class PostRepository {
  private prisma = prisma;

  public totalPosts(whereClause: any) {
    return this.prisma.post.count({ where: whereClause });
  }

  public totalHighlights(whereClause: any) {
    return this.prisma.post.count({ where: { ...whereClause, highlight: true } });
  }

  public totalActivePosts(whereClause: any) {
    return this.prisma.post.count({ where: { ...whereClause, published: PostPublished.ACTIVE } });
  }

  public totalSlides(whereClause: any) {
    return this.prisma.post.count({ where: { ...whereClause, slide: true } });
  }

  public async getPostsPagination(
    whereClause: any,
    skip: number,
    limitNum: number,
    pageNum: number,
  ): Promise<PaginationResult<PostEntity>> {
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
      data: PostEntity.fromPersistence(posts as PostWithCategoryAuthorRelations[]),

      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    };
  }

  public getPostsWithSlidesOrHighlightPosts(field: SlidesOrHighlightPosts): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      where: {
        published: PostPublished.ACTIVE,
        [field]: true,
      },
    });
  }

  public async allFrontPosts() {
    const content = await this.prisma.category.findMany({
      where: {
        posts: {
          some: {
            published: PostPublished.ACTIVE,
          },
        },
      },
      include: {
        posts: {
          where: {
            published: PostPublished.ACTIVE,
            slide: false,
            highlight: false,
          },
          take: 4,
          orderBy: {
            createdAt: "desc",
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
    return PostEntity.fromAllPosts(content as CategoryWithAuthorPostsRelations[]);
  }

  public getPostById(id: number): Promise<PostEntity | null> {
    console.log("get post by id repository:", id);
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  public findTitle(action: string, id: number, title: string) {
    return this.prisma.post.findFirst({
      where: {
        title,
        ...(action === "editPost" && id ? { id: { not: Number(id) } } : {}),
      },
    });
  }

  public upsertPost(postSettings: PostEntity) {
    console.log("upsert post repository:", postSettings);
    const {
      id,
      title,
      slug,
      content,
      categoryId,
      scheduledAt,
      published,
      thumbnail,
      slide,
      highlight,
      authorId,
    } = postSettings;
    return this.prisma.post.upsert({
      where: { id: id ? id : 0 },
      update: {
        title,
        slug,
        content,
        ...(thumbnail && { thumbnail }),
        categoryId: Number(categoryId),
        published,
        scheduledAt,
        ...(slide !== undefined && { slide: slide === true }),
        ...(highlight !== undefined && { highlight: highlight === true }),
      },
      create: {
        title: postSettings.title!,
        slug: postSettings.slug!,
        content: postSettings.content!,
        categoryId: Number(postSettings.categoryId),
        thumbnail: postSettings.thumbnail!,
        scheduledAt: postSettings.scheduledAt!,
        authorId,
        slide: slide === true,
        highlight: highlight === true,
      },
    });
  }

  public updatePostStatus(id: number, field: PostField, status: boolean) {
    console.log("status repo: ", status);
    return this.prisma.post.update({
      where: { id: Number(id) },
      data: {
        [field]:
          field === "published"
            ? status
              ? PostPublished.ACTIVE
              : PostPublished.UNACTIVE
            : (status as boolean),
      },
    });
  }

  public deletePost(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }

  public async getPostBySlug(slug: string): Promise<PostEntity | null> {
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
    return newsContent ? PostEntity.PostBySlug(newsContent as PostWithAuthorRelations) : null;
  }

  public async searchTerm(term: string): Promise<PostEntity[]> {
    const posts = await this.prisma.post.findMany({
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
    return PostEntity.fromSearch(posts as PostWithCategoryRelations[]);
  }
}
