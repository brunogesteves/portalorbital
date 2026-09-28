import { Post, PostPublished } from "@prisma/client";
import { CategoryEntity } from "../category-entity";
import { PostField } from "./types/post-field";
import { UserEntity } from "../user/user-entity";
import {
  CategoryWithAuthorPostsRelations,
  PostWithAuthorRelations,
  PostWithCategoryAuthorRelations,
  PostWithCategoryRelations,
} from "./types/post-with-relations";
import { UserRole } from "../user/types/user-role";
import type { CategoryWithPosts } from "./types/category-with-posts";

export class PostEntity {
  id?: number;
  title?: string;
  slug?: string;
  thumbnail?: string | null;
  content?: string;
  scheduledAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  published?: PostPublished;
  slide?: boolean;
  highlight?: boolean;
  categoryId?: number;
  authorId: number;
  field?: PostField;

  category?: CategoryEntity;
  author?: UserEntity;

  constructor(params: PostEntity) {
    this.id = params.id;
    this.title = params.title;
    this.slug = params.slug;
    this.thumbnail = params.thumbnail;
    this.content = params.content;
    this.scheduledAt = params.scheduledAt;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.published = params.published;
    this.slide = params.slide;
    this.highlight = params.highlight;
    this.categoryId = params.categoryId;
    this.authorId = params.authorId;

    this.category = params.category;
    this.author = params.author;
  }

  static fromSearch(posts: PostWithCategoryRelations[]): PostEntity[] {
    return posts.map((post) => {
      return new PostEntity({
        category: {
          slug: post.category?.slug,
          name: post.category?.name,
        },
        slug: post.slug,
        id: post.id,
        title: post.title,
        slide: post.slide,
        highlight: post.highlight,
        createdAt: post.createdAt,
        thumbnail: post.thumbnail,
        content: post.content,
        scheduledAt: post.scheduledAt,
        updatedAt: post.updatedAt,
        published: post.published,
        categoryId: post.categoryId,
        authorId: post.authorId,
      });
    });
  }

  static fromPersistence(posts: PostWithCategoryAuthorRelations[]): PostEntity[] {
    return posts.map((post) => {
      return new PostEntity({
        category: {
          slug: post.category?.slug,
          name: post.category?.name,
          id: post.category?.id,
        },
        author: {
          name: post.author?.name,
          email: post.author?.email,
          role: post.author?.role as UserRole,
        },
        slug: post.slug,
        id: post.id,
        title: post.title,
        createdAt: post.createdAt,
        thumbnail: post.thumbnail,
        content: post.content,
        scheduledAt: post.scheduledAt,
        updatedAt: post.updatedAt,
        published: post.published,
        slide: post.slide,
        highlight: post.highlight,
        categoryId: post.categoryId,
        authorId: post.authorId,
      });
    });
  }

  static fromAllPosts(content: CategoryWithAuthorPostsRelations[]): CategoryWithPosts[] {
    return content
      .map((item) => {
        return {
          id: item.id,
          name: item.name,
          slug: item.slug,
          posts: item.posts.map(
            (post) =>
              new PostEntity({
                category: {
                  slug: item.slug,
                  name: item.name,
                  id: item.id,
                },
                author: {
                  name: post.author?.name,
                  email: post.author?.email,
                  role: post.author?.role as UserRole,
                },
                slug: post.slug,
                id: post.id,
                title: post.title,
                createdAt: post.createdAt,
                thumbnail: post.thumbnail,
                content: post.content,
                scheduledAt: post.scheduledAt,
                updatedAt: post.updatedAt,
                published: post.published,
                slide: post.slide,
                highlight: post.highlight,
                categoryId: post.categoryId,
                authorId: post.authorId,
              }),
          ),
        };
      })
      .filter((category) => category.posts.length > 0);
  }

  static PostBySlug(post: PostWithAuthorRelations): PostEntity {
    return new PostEntity({
      ...post,
      author: {
        name: post.author?.name,
        email: post.author?.email,
        role: post.author?.role as UserRole,
      },
    });
  }
}
