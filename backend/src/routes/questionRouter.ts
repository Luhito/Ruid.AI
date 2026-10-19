import { Router } from "express";
import { questionControllers } from "../controllers/index.js"

const router = Router();

router.get("/:question_id", questionControllers.getQuestion);

router.post("/:question_id/answers", questionControllers.submitAnswer)

export default router;