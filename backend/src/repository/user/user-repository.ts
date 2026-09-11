import type { UserPresenter } from "../../controllers/user/presenters/user-presenters";
import prisma from "../../lib/prisma";

import type { AuthEntity } from "../../entities/auth-entity";
import type { UserSettingsPresenter } from "../../controllers/user/presenters/user-settings-presenters";

export class UserRepository {
  private prisma = prisma;

  public async getByEmail(data: AuthEntity): Promise<UserSettingsPresenter | null> {
    const { email } = data;
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async getUserById(id: number): Promise<UserPresenter | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
        role: true,
      },
    });
  }
}
