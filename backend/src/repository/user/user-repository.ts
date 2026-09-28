import prisma from "../../lib/prisma";

import { UserEntity } from "../../entities/user/user-entity";

export class UserRepository {
  private prisma = prisma;

  public async getByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? UserEntity.fromPersistent(user) : null;
  }

  public async getUserById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? UserEntity.fromPersistent(user) : null;
  }
}
