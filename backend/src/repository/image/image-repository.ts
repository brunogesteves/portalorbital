import prisma from "../../lib/prisma";

export class ImageRepository {
  private prisma = prisma;

  // O UseCase vai chamar os dois métodos

  // getPostByThumbnail
  public async veriricationImage(filename: string) {
    const thumbnailhasbeenUsed = await this.prisma.post.findFirst({
      where: {
        OR: [{ thumbnail: filename }, { thumbnail: `/images/${filename}` }],
      },
      select: { id: true, title: true },
    });

    const contentUsage = await this.contentUsage(filename); // ----> remover esta linha
    return thumbnailhasbeenUsed || contentUsage; // o usecase que vai fazer essa lógica.
  }

  // getPostByHasContent
  public async contentUsage(filename: string) {
    const contentUsage = await this.prisma.post.findFirst({
      where: {
        content: {
          contains: filename,
        },
      },
      select: { id: true, title: true },
    });
    return contentUsage;
  }
}
