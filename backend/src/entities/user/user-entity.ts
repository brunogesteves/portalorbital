import type { Role } from "@prisma/client";

export class User {
  name: string | null;
  id: number;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;

  constructor(
    name: string | null,
    id: number,
    email: string,
    password: string,
    role: Role,
    createdAt: Date,
  ) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
  }
}
