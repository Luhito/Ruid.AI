import type { UUID } from "@/types/uuid.js";
import { AppError } from "./appError.js";

export class CreateQuestionError extends AppError {
    constructor(e: unknown, roomId: UUID) {
        super(`An error occuered while creating question. 
            roomId: ${roomId}
            cause: ${e}`)
    }
}