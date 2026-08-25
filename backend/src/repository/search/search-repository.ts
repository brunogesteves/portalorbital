
import { PrismaClient } from "@prisma/client";
import type { SearchContent } from "../../entities/search/search-entity";

export class SearchRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }


    public async searchTerm(term: string): Promise<SearchContent[]> {

        const postsResults = await this.prisma.post.findMany({
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
                        id: true,
                        name: true,
                        slug: true,
                    }
                },
            },
        });

        return postsResults

    }

}
