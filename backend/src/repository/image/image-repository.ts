import prisma from "../../lib/prisma";

export class ImageRepository {
  private prisma = prisma;

  public async veriricationImage(filename: string) {
    return await this.prisma.post.findFirst({
      where: {
        OR: [{ thumbnail: filename }, { thumbnail: `/images/${filename}` }],
      },
      select: { id: true, title: true },
    });
  }

  public async getPostByHasContent(filename: string) {
    return await this.prisma.post.findFirst({
      where: {
        content: {
          contains: filename,
        },
      },
      select: { id: true, title: true },
    });
  }
}
