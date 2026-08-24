import type { Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../repository/user/user-repository";

export class LoginUseCase {
  public async execute(req: Request): Promise<string> {
    const { email, password } = req.body;

    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    return token;
  }
}
