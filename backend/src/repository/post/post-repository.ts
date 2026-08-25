

import { PrismaClient } from "@prisma/client";
import type { CreateUpdatePost } from "../../entities/post/create-update-entity";
import type { TitleExisting } from "../../entities/post/title-entity";


export class PostRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

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

    public async getPosts(whereClause: string, skip: number, limitNum: number, pageNum: number) {
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

    public async getSlides() {
        const posts = await this.prisma.post.findMany({
            where: {
                slide: true,
            },
            select: {
                thumbnail: true,
                slug: true,
                title: true,
            },
        });
        return posts
    }

    public async highlightPosts() {
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
        return posts
    }

    public async allPosts() {
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
        return allPosts
    }

    public async getPostById(id: string) {
        const uniquePost = await this.prisma.post.findUnique({
            where: { id: Number(id) },
        });
        return uniquePost
    }

    public async findTitle(config: TitleExisting) {
        const { isEdit, id, title } = config

        const existingTitle = await this.prisma.post.findFirst({
            where: {
                title,
                ...(isEdit && { id: { not: Number(id) } }),
            },
        });
        return existingTitle
    }

    public async createUpdatePost(content: CreateUpdatePost, config: TitleExisting) {
        const { isEdit, id, title } = config
        const upsertPost = await this.prisma.post.upsert({
            where: { id: isEdit ? Number(id) : 0 },
            update: {
                title,
                slug,
                content,
                categoryId: Number(categoryId),
                scheduledAt: new Date(scheduledAt),
                ...(thumbnail && { thumbnail }),
                ...(slide !== undefined && { slide: slide === "true" }),
                ...(highlight !== undefined && { highlight: highlight === "true" }),
            },
            create: {
                title,
                slug,
                content,
                thumbnail,
                scheduledAt: new Date(scheduledAt),
                categoryId: Number(categoryId),
                authorId: req.user.id,
                status: false,
                slide: slide === "true",
                highlight: highlight === "true",
            },
        });
        return upsertPost;
    }
}


