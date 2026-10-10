import type { Choice } from "./choice.js";
import type { UUID } from "../uuid.js";

/** QuestionSet */
export type Question = {
    questionId: UUID,
    createUserId: UUID;
    roomId: UUID;
    questionText: string;
    explanationText: string;
    summary: string;
    choices: Choice[];
    correctAnswerIndex: number;
    answeredFlg: boolean | null;
}