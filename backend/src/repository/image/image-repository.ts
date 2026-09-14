import prisma from "../../lib/prisma";

export class ImageRepository {
  private prisma = prisma;

  public veriricationImage(filename: string) {
    return this.prisma.post.findFirst({
      where: {
        OR: [{ thumbnail: filename }, { thumbnail: `/images/${filename}` }],
      },
      select: { id: true, title: true },
    });
  }

  public getPostByHasContent(filename: string) {
    return this.prisma.post.findFirst({
      where: {
        content: {
          contains: filename,
        },
      },
      select: { id: true, title: true },
    });
  }
}
