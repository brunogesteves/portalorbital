import { UserRepository } from "./../../repository/user/user-repository";
import { UserEntity } from "../../entities/user/user-entity";

export class UserSettingsUseCase {
  public async execute(user: UserEntity): Promise<UserEntity> {
    if (!user) {
      throw new Error("Não autenticado");
    }

    const userRepository = new UserRepository();
    const userData = await userRepository.getUserById(Number(user.id!));

    if (!userData) {
      throw new Error("Usuário não encontrado");
    }
    return userData;
  }
}
