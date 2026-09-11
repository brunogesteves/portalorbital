import type { UserPresenter } from "../../controllers/user/presenters/user-presenters";
import prisma from "../../lib/prisma";

import type { AuthEntity } from "../../entities/auth-entity";
import type { UserSettingsPresenter } from "../../controllers/user/presenters/user-settings-presenters";

export class UserRepository {
  private prisma = prisma;

  public getByEmail(data: AuthEntity): Promise<UserSettingsPresenter | null> {
    return this.prisma.user.findUnique({
      where: { email: data.email },
    });
  }

  public getUserById(id: number): Promise<UserPresenter | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
        role: true,
      },
    });
  }
}
