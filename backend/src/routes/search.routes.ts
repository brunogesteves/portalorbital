import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  searchContent,
  searchOneContent,
} from "../controllers/search.controller";

const router = Router();

router.get("/", searchContent);
router.get("/:slug", searchOneContent);

export default router;
