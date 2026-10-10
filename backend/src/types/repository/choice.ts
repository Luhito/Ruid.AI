import type { UUID } from "../uuid.js";

export type Choice = {
    questionId: UUID;
    tag: string;
    text: string;
    isCorrect: boolean;
}