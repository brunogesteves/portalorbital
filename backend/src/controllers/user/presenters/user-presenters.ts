import { UserEntity } from "../../../entities/user/user-entity";

export function userSettingsPresenter(user: UserEntity) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
