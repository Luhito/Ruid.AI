import type { UUID } from "@/types/uuid.js";
import { AppError } from "./appError.js";

export class QuestionGenerationError extends AppError {
    constructor(roomId: UUID) {
        super(`An error occuered while generating question. 
            roomId: ${roomId}`)
    }
}