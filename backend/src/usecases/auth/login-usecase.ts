import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserRepository } from "../../repository/user/user-repository";
import { AuthEntity } from "../../entities/auth-entity";

import { LoginDTO } from "../../controllers/auth/dtos/login.dto";

export class LoginUseCase {
  public async execute(dto: LoginDTO): Promise<string> {
    const { email, password } = dto;
    const authEntity = new AuthEntity({ email, password });

    const userRepository = new UserRepository();

    const user = await userRepository.getByEmail(authEntity);
    if (!user) {
      throw new Error("Invalid user");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid pass");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    return token;
  }
}
