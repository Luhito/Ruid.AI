import { Router } from "express";
import { getQuestion } from "../controllers/questionControllers.js"

const router = Router();

router.get("/:question_id", getQuestion);

export default router;