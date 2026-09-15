import { Router, type Request, type Response } from "express";

import { LoginUseCase } from "../../usecases/auth/login-usecase";
import { LogoutUseCase } from "../../usecases/auth/logout-usecase";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserSettingsUseCase } from "../../usecases/auth/user-usecase";
import { loginSchema } from "./dtos/login.dto";
import { validateBody } from "../../middlewares/body-validator";
import { AuthPresenter } from "./presenters/auth.presenter";
import { UserPresenterPresenter } from "../user/presenters/user-presenters";

const router = Router();

router.post("/login", validateBody(loginSchema), async (req: Request, res: Response) => {
  const loginUseCase = new LoginUseCase();
  const login = await loginUseCase.execute(req.body);
  const presenter = new AuthPresenter(login);
  res.json(presenter);
});

router.post("/logout", async (req: Request, res: Response) => {
  const logOut = new LogoutUseCase();
  const result = await logOut.execute(res);
  res.json(result);
});

router.get("/me", authenticate, async (req: Request, res: Response) => {
  const userSettingsUseCase = new UserSettingsUseCase();
  const presenter = await userSettingsUseCase.execute(req);

  res.json(presenter);
});

export default router;
