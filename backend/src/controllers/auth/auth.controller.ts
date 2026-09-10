import { Router, type Request, type Response } from "express";

import { LoginUseCase } from "../../usecases/auth/login-usecase";
import { LogoutUseCase } from "../../usecases/auth/logout-usecase";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserSettingsUseCase } from "../../usecases/auth/user-usecase";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const login = new LoginUseCase();
    const result = await login.execute(req, res);
    res.json(result);
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Credenciais inválidas" });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  const logOut = new LogoutUseCase();
  const result = await logOut.execute(res);
  res.json(result);
});

router.get("/me", authenticate, async (req: Request, res: Response) => {

  const userSettings = new UserSettingsUseCase();
  const result = await userSettings.execute(req);
  res.json({ user: result });

});

export default router;
