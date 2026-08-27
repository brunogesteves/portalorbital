import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../repository/user/user-repository";

export class LoginUseCase {
  
  public async execute(req: Request, res: Response): Promise<{ status: boolean }> {
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

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      maxAge: 1 * 60 * 60 * 1000,
      sameSite: "lax",
      path: "/",
    });

    return { status: true };
  }
}
