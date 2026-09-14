export class PostEntity {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  slide: boolean;
  highlight: boolean;
  categoryId: number;
  authorId: number;
  field: "status" | "slide" | "highlight";

  constructor(params: {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    content: string;
    scheduledAt: Date;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    slide: boolean;
    highlight: boolean;
    categoryId: number;
    authorId: number;
    field: "status" | "slide" | "highlight";
  }) {
    this.id = params.id;
    this.title = params.title;
    this.slug = params.slug;
    this.thumbnail = params.thumbnail;
    this.content = params.content;
    this.scheduledAt = params.scheduledAt;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.status = params.status;
    this.slide = params.slide;
    this.highlight = params.highlight;
    this.categoryId = params.categoryId;
    this.authorId = params.authorId;
    this.field = params.field;
  }
  // static fromStatus(data: Pick<PostEntity, "id" | "status" | "field">): PostEntity {
  //   return new PostEntity(
  //     data.id,
  //     "",
  //     "",
  //     "",
  //     "",
  //     new Date(),
  //     new Date(),
  //     new Date(),
  //     data.status,
  //     false,
  //     false,
  //     0,
  //     0,
  //     data.field,
  //   );
  // }
}
