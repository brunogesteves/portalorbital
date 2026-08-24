import type { Response } from "express";

export class LogoutUseCase {
    public async execute(res: Response): Promise<any> {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true',
            sameSite: 'lax',
            path: "/",
            domain: process.env.COOKIE_DOMAIN || undefined,
        });
        return res.json({ message: 'Logout bem-sucedido' });
    };

}