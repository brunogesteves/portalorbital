import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "@prisma/client";

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: Role;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as any;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const authorize =
  (roles: Role[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }
    next();
  };
