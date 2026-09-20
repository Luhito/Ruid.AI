import { PromptValidationError } from "@/errors/PromptValidationError.js";
import type { QuestionSet } from "@/types/questionSet.js";

export const createQuestion = async (prompt: string) => {
    const question_id = "tsetquestion_id";


    const testQuestionSet = {
        question_text: `this is a test question text generated in createQuestion at ${Date.now()}`,
        choices: [{tag: "Ex", text: "test choice in createQuestion"}],
        explanation_text: `this is a test explanation text generated in createQuestion at ${Date.now()}`,
        correct_answer_index: 0
    } satisfies QuestionSet;

    if (!prompt) {
        throw new PromptValidationError(prompt);
    }

    return {
        question_id,
        question: testQuestionSet
    }
}