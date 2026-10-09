import type { Choice } from "./choice.js";
import type { UUID } from "./uuid.js";

/** QuestionSet */
export interface QuestionSet {
    room_id: UUID
    question_text: string;
    choices: Choice[];
    explanation_text: string;
    correct_answer_index: number;
    answered_flg: boolean;
    summary: string;
}