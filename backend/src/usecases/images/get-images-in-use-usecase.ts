import prisma from "../../lib/prisma";

export class GetImagesInUseUseCase {
  
  public async execute() {
    const posts = await prisma.post.findMany({
      select: {
        thumbnail: true,
        content: true,
      },
    });

    const usedImages = new Set<string>();

    for (const post of posts) {
      if (post.thumbnail) {
        const filename = post.thumbnail.replace("/images/", "");
        usedImages.add(filename);
      }
      if (post.content) {
        const regex = /src="[^"]*\/images\/([^"]+)"/g;
        let match;
        while ((match = regex.exec(post.content)) !== null) {
          usedImages.add(match[1]);
        }
      }
    }

    return Array.from(usedImages);
  }
}
