import type { Response } from "express";

export class LogoutUseCase {
  public async execute(res: Response): Promise<{ status: boolean }> {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      path: "/",
      domain: process.env.COOKIE_DOMAIN || undefined,
    });
    return { status: true };
  }
}
