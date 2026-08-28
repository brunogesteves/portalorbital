import type { Role } from "@prisma/client";

export class UserSettingsEntity {

  name: string | null;
  role: Role;
  email: string;

  constructor(name: string | null, email: string, role: Role) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
