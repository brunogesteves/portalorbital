import { Router, type Request, type Response } from "express";

import { LoginUseCase } from "../usecases/auth/login-usecase";
import { LogoutUseCase } from "../usecases/auth/logout-usecase";
import { authenticate } from "../middlewares/auth.middleware";
import { UserSettingsUseCase } from "../usecases/auth/user-usecase";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const login = new LoginUseCase();
  const result = await login.execute(req);
  res.json(result);
});

router.post("/logout", async (res: Response) => {
  const logOut = new LogoutUseCase();
  const result = await logOut.execute(res)
  res.json(result);
});

router.post("/me", authenticate, (req: Request, res: Response) => {
  const me = new UserSettingsUseCase()
  const result = me.execute(req);
  res.json(result);
});

export default router;
