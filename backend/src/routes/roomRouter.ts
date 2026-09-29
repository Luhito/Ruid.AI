import { Router } from "express";
import { postRoom, getRoom, getQuestionsByRoomId, getNewQuestionId } from "../controllers/roomController.js"

const router = Router();

// GET /rooms/:room_id
router.get("/:room_id", getRoom);

// POST /room
router.post("/", postRoom);

// GET /rooms/:room_id/questions
router.get("/:room_id/questions", getQuestionsByRoomId)

// GET /rooms/:room_id/questions/next
router.get("/:room_id/questions/next", getNewQuestionId)

export default router;