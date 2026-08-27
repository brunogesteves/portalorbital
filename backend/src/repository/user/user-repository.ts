import type { User } from "../../controllers/auth/presenters/user-presenters";
import prisma from "../../lib/prisma";
import type { UserSettings } from "../../entities/user-settings-entity";

export class UserRepository {
  private prisma = prisma;

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  public async getUserSettings(id: number): Promise<UserSettings | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
        role: true,
      },
    });
    return user;
  }
}
