import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "../entities/user/types/user-role";
import { UserEntity } from "../entities/user/user-entity";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  let authToken = token;

  if (!authToken) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      authToken = authHeader.slice(7);
    }
  }

  if (!authToken) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  try {
    const { user } = jwt.verify(authToken, process.env.JWT_SECRET as string) as any;

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const authorize =
  (roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }
    next();
  };
