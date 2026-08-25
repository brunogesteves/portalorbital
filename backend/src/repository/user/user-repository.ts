import type { User } from "../../entities/user/user-entity";
import prisma from "../../lib/prisma";
import type { UserSettings } from "../../entities/user/user-settings-entity";

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
