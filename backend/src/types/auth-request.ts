import type { Request } from "express";
import type { Role } from "@prisma/client";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: Role;
  };
}
