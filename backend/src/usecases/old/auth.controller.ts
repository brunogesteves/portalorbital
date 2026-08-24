import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import type { JwtPayload } from "../types";

const { user: usr } = prisma;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await usr.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      maxAge: 1 * 60 * 60 * 1000, // 1 hora
      sameSite: "lax",
      path: "/",
      domain: process.env.COOKIE_DOMAIN || undefined,
    });

    return res.json({
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax",
    path: "/",
    domain: process.env.COOKIE_DOMAIN || undefined,
  });
  return res.json({ message: "Logout bem-sucedido" });
};

export const me = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).user as JwtPayload;
    const user = await usr.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};
