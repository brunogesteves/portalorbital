import type { UserSettings } from "../../entities/user/user-settings-entity";
import { UserRepository } from "./../../repository/user/user-repository";
import type { AuthRequest } from "../../types/auth-request";

export class UserSettingsUseCase {
  public async execute(req: AuthRequest): Promise<UserSettings | null> {
    if (!req.user) {
      throw new Error("Não autenticado");
    }
    const userRepository = new UserRepository();
    const user = await userRepository.getUserSettings(req.user.id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  }
}
