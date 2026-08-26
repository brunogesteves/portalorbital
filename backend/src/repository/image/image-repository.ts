import type { User } from "../../entities/user/user-entity";
import prisma from "../../lib/prisma";
import type { UserSettings } from "../../entities/user/user-settings-entity";

export class ImageRepository {
  private prisma = prisma;

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
