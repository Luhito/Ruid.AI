import type { UUID } from "crypto";
import type { Choice } from "./choice.js";

/** QuestionSet */
export interface QuestionSet {
    room_id: UUID;
    question_text: string;
    choices: Choice[];
    explanation_text: string;
    correct_answer_index: number;
}