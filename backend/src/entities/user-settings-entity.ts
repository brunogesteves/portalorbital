import type { Role } from "@prisma/client";

export class UserSettingsEntity {
  name: string | null;
  role: Role;
  email: string;

  constructor(params: { name: string | null; email: string; role: Role }) {
    this.name = params.name;
    this.email = params.email;
    this.role = params.role;
  }
}
