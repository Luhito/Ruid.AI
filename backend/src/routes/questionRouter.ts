import { Router } from "express";
import { getQuestion } from "../controllers/questionControllers.js"

const router = Router();

router.get("/:qid", getQuestion);

export default router;