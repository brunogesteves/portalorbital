export class CreateUpdatePost {
    slug: string;
    content: string;
    categoryId: number;
    scheduledAt: Date;
    thumbnail: string | null;
    slide: boolean;
    highlight: boolean;
    authorId: number;

    constructor(
        slug: string,
        content: string,
        categoryId: number,
        scheduledAt: Date,
        thumbnail: string | null,
        slide: boolean,
        highlight: boolean,
        authorId: number,
    ) {
        this.slug = slug;
        this.thumbnail = thumbnail;
        this.content = content;
        this.scheduledAt = scheduledAt;
        this.slide = slide;
        this.highlight = highlight;
        this.categoryId = categoryId;
        this.authorId = authorId;
    }
}
