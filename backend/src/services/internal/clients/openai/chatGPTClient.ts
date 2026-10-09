import type { GenerateQuestionCandidateQuery } from "@/types/apiclient/generateQuestionCandidateQuery.js";
import type { QuestionSet } from "@/types/questionSet.js";
import { UUID } from "@/types/uuid.js";

export const generateQuestionCandidate = async (q: GenerateQuestionCandidateQuery): Promise<QuestionSet|null> => {
    if (!q.query) {
        return null;
    }

    return {
        room_id: UUID.create('01a09db5-6b0f-7a9a-9a76-df21bc1cfd0f'),
        question_text: 'dummy',
        choices: [
            {tag: "a", text: "dummy"},
            {tag: "b", text: "dummy"},
            {tag: "c", text: "dummy"},
            {tag: "d", text: "dummy"}
        ],
        correct_answer_index: 0,
        explanation_text: "dummy explanation text",
        answered_flg: false,
        summary: "dummy question"
    }
}

export const verifyQuestion = async (question: QuestionSet): Promise<boolean> => {
    return !!question;
}