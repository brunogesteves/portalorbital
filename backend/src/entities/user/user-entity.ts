import type { UserRole } from "./types/user-role";
import type { User } from "@prisma/client";

export class UserEntity {
  id?: number;
  name: string | null;
  role: UserRole;
  email: string;
  password?: string;
  createdAt?: Date;

  constructor(params: {
    id?: number;
    name: string | null;
    email: string;
    role: UserRole;
    password?: string;
    createdAt?: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.role = params.role;
    this.password = params.password;
    this.createdAt = params.createdAt;
  }

  static fromPersistent(data: User): UserEntity {
    return new UserEntity({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role as UserRole,
      password: data.password,
      createdAt: data.createdAt,
    });
  }
}
