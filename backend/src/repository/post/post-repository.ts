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

  public async getPostsCategorized() {
    const posts = await this.prisma.category.findMany({
      where: {
        posts: {
          some: {
            published: PostPublished.ACTIVE,
          },
        },
      },
      select: {
        name: true,
        _count: {
          select: {
            posts: {
              where: {
                published: PostPublished.ACTIVE,
              },
            },
          },
        },
      },
    });
    return posts.map((category) => ({
      name: category.name,
      totalPosts: category._count.posts,
    }));
  }

  public getPostsAtTheSameTime(authorId?: number) {
    return this.prisma.post.count({
      where: {
        published: PostPublished.ACTIVE,
        slide: true,
        highlight: true,
        // authorId: authorId ? authorId : {},
      },
    });
  }

  public totalHighlights(authorId?: number) {
    return this.prisma.post.count({
      where: authorId ? { authorId, highlight: true } : { highlight: true },
    });
  }

  public totalActivePosts(authorId: number | undefined) {
    return this.prisma.post.count({
      where: authorId
        ? { authorId, published: PostPublished.ACTIVE }
        : { published: PostPublished.ACTIVE },
    });
  }

  public totalSlides(authorId: number | undefined) {
    return this.prisma.post.count({
      where: authorId ? { authorId, slide: true } : { slide: true },
    });
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
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  public findTitle(title: string, excludeId?: number) {
    return this.prisma.post.findFirst({
      where: {
        title,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
  }

  public upsertPost(data: PostEntity) {
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
      createdAt,
      updatedAt,
    } = data;
    return this.prisma.post.upsert({
      where: { id: id ? id : 0 },
      update: {
        title,
        slug,
        content,
        categoryId,
        scheduledAt,
        ...(published !== undefined && { published }),
        ...(thumbnail && { thumbnail }),
        slide,
        highlight,
        ...(Number.isFinite(authorId) && { authorId }),
        createdAt,
        updatedAt,
      },
      create: {
        title: title!,
        slug: slug!,
        content: content!,
        categoryId: categoryId!,
        scheduledAt: scheduledAt!,
        published: published!,
        thumbnail: thumbnail!,
        slide: slide!,
        highlight: highlight!,
        authorId: authorId!,
        createdAt,
        updatedAt,
      },
    });
  }

  public updatePostStatus(id: number, field: PostField, status: boolean) {
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
