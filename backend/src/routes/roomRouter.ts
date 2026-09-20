import { Router } from "express";
import { postRoom, getRoom } from "../controllers/roomController.js"

const router = Router();

router.get("/:room_id", getRoom);
router.post("/", postRoom);

export default router;