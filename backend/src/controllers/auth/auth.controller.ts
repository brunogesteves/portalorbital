import { Router, type Request, type Response } from "express";

import { LoginUseCase } from "../../usecases/auth/login-usecase";
import { LogoutUseCase } from "../../usecases/auth/logout-usecase";
import { authenticate } from "../../middlewares/auth.middleware";
import { UserSettingsUseCase } from "../../usecases/auth/user-usecase";
import { loginSchema } from "./dtos/login.dto";
import { validateBody } from "../../middlewares/body-validator";
import { authPresenter } from "./presenters/auth.presenter";
import { userSettingsPresenter } from "../user/presenters/user-presenters";
import { UserEntity } from "../../entities/user/user-entity";

const router = Router();

router.post("/login", validateBody(loginSchema), async (req: Request, res: Response) => {
  const loginUseCase = new LoginUseCase();
  const token = await loginUseCase.execute(req.body);
  const presenter = authPresenter(token);
  res.json(presenter);
});

router.post("/logout", async (req: Request, res: Response) => {
  const logOut = new LogoutUseCase();
  const deleteToken = await logOut.execute(res);
  res.json(deleteToken);
});

router.get("/me", authenticate, async (req: Request, res: Response) => {
  const { user } = req;

  const userSettingsUseCase = new UserSettingsUseCase();
  const getUserSettings = await userSettingsUseCase.execute(user! as UserEntity);
  const presenter = userSettingsPresenter(getUserSettings);

  res.json(presenter);
});

export default router;
