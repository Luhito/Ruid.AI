import { Router } from "express";
import { roomControllers } from "../controllers/index.js"

const router = Router();

// GET /rooms/:room_id
router.get("/:room_id", roomControllers.getRoom);

// POST /room
router.post("/", roomControllers.postRoom);

// GET /rooms/:room_id/questions
router.get("/:room_id/questions", roomControllers.getQuestionsByRoomId)

// GET /rooms/:room_id/questions/next
router.get("/:room_id/questions/next", roomControllers.getNewQuestionId)

export default router;