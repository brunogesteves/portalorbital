import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { openContent, searchContent } from "../controllers/search.controller";

const router = Router();

router.get("/", searchContent);
router.get("/:slug", openContent);

export default router;
