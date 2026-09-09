import type { UserPresenter } from "../../controllers/user/presenters/user-presenters";
import prisma from "../../lib/prisma";

import type { AuthEntity } from "../../entities/auth-entity";
import type { UserSettingsPresenter } from "../../controllers/user/presenters/user-settings-presenters";

export class UserRepository {
  private prisma = prisma;

  public async findByEmail(data: AuthEntity): Promise<UserSettingsPresenter | null> {
    const { email } = data;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  // TODO: Talvez o nome mais claro seja getUserById
  public async getUserSettings(id: number): Promise<UserPresenter | null> {
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
