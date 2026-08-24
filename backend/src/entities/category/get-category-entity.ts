export class GetCategories {
    name: string;
    id: number;
    slug: string;

    constructor(
        name: string,
        id: number,
        slug: string,

    ) {
        this.id = id;
        this.name = name;
        this.slug = slug;

    }
}