import { UserRepository } from "./../../repository/user/user-repository";
import type { AuthRequest } from "../../types/auth-request";
import type { UserPresenter } from "../../controllers/user/presenters/user-presenters";

export class UserSettingsUseCase {
  public async execute(req: AuthRequest): Promise<UserPresenter | null> {
    if (!req.user) {
      throw new Error("Não autenticado");
    }

    const userRepository = new UserRepository();
    const user = await userRepository.getUserById(req.user.id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  }
}
