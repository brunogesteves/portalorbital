import type { UserSettings } from '../../entities/user/user-settings-entity';
import { UserRepository } from './../../repository/user/user-repository';
import type { Request } from "express";

export class UserSettingsUseCase {
    public async execute(req: Request): Promise<UserSettings | null> {

        const { id } = req.body;
        const userRepository = new UserRepository()
        const user = await userRepository.getUserSettings(id)

        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user




    }
}