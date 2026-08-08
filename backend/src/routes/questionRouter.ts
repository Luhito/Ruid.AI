import { Router } from "express";
import { getQuestion, postQuestion } from "../controllers/questionControllers.js"

const router = Router();

router.get("/:qid", getQuestion);
router.post("/", postQuestion);

export default router;