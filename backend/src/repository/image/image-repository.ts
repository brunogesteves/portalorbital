import prisma from "../../lib/prisma";

export class ImageRepository {
  private prisma = prisma;

  // TODO: Separar em 2 metodos e deixar o "verificationImage" no usecase
  public async veriricationImage(filename: string) {
    const thumbnailhasbeenUsed = await this.prisma.post.findFirst({
      where: {
        OR: [{ thumbnail: filename }, { thumbnail: `/images/${filename}` }],
      },
      select: { id: true, title: true },
    });

    const contentUsage = await this.prisma.post.findFirst({
      where: {
        content: {
          contains: filename,
        },
      },
      select: { id: true, title: true },
    });
    return thumbnailhasbeenUsed || contentUsage;
  }
}
