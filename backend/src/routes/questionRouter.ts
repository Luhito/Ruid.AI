import { Router } from "express";
import { questionControllers } from "../controllers/index.js"

const router = Router();

router.get("/:question_id", questionControllers.getQuestion);

export default router;