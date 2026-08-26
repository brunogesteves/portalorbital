import type { CreateUpdatePost } from "../../entities/post/create-update-entity";
import type { TitleExisting } from "../../entities/post/title-entity";
import type { Request } from "express";
import type { GetPosts } from "../../entities/post/get-post-entity";
import type { GetSlides } from "../../entities/post/get-slide-entity";
import type { GetHighlight } from "../../entities/post/get-highlight-entity";
import type { AllPostsFront } from "../../entities/post/all-posts-entity";
import prisma from "../../lib/prisma";

export class PostRepository {
  private prisma = prisma;

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

  public async getPosts(
    whereClause: any,
    skip: number,
    limitNum: number,
    pageNum: number,
  ): Promise<GetPosts> {
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

  public async highlightPosts(): Promise<GetHighlight[]> {
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
        ...(action && { id: { not: Number(id) } }),
      },
    });
    return existingTitle;
  }

  public async createUpdatePost(postSettings: CreateUpdatePost, itensTitle: TitleExisting) {
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

  public async updatePostStatus(req: Request) {
    const { id } = req.params;
    const { status } = req.body;
    const post = await this.prisma.post.update({
      where: { id: Number(id) },
      data: { status },
    });

    return post;
  }

  public async updatePostSlide(req: Request) {
    const { id } = req.params;
    const { highlight } = req.body;
    const post = await this.prisma.post.update({
      where: { id: Number(id) },
      data: { highlight },
    });

    return post;
  }

  public async deletePost(id: string) {
    const existingPost = await this.prisma.post.delete({
      where: { id: Number(id) },
    });
    return existingPost;
  }
}
