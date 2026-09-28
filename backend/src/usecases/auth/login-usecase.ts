import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../repository/user/user-repository";
import { LoginDTO } from "../../controllers/auth/dtos/login.dto";

export class LoginUseCase {
  public async execute(dto: LoginDTO): Promise<string> {
    const { email, password } = dto;

    const userRepository = new UserRepository();
    const user = await userRepository.getByEmail(email);

    if (!user) {
      throw new Error("Invalid user");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new Error("Invalid pass");
    }

    const token = jwt.sign(
      { user: { id: user.id, email, password } },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );

    return token;
  }
}
