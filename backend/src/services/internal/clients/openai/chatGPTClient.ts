import { UUID } from '@/types/uuid.js';
import type * as types from './chatGPTClient.types.js'

export const generateQuestionCandidate = async (q: types.GenerateQuestionCandidateQuery): Promise<types.GenerateQuestionCandidateResponse | null> => {
    if (!q.query) {
        return null;
    }

    const newQuestionId = UUID.generate();

    return {
        questionText: 'dummy',
        choices: [
            {tag: "a", text: "dummy", isCorrect: true},
            {tag: "b", text: "dummy", isCorrect: false},
            {tag: "c", text: "dummy", isCorrect: false},
            {tag: "d", text: "dummy", isCorrect: false},
        ],
        correctAnswerIndex: 0,
        explanationText: "dummy explanation text",
        summary: "dummy question"
    }
}

export const verifyQuestion = async (questionCondidate: types.GenerateQuestionCandidateResponse): Promise<boolean> => {
    return true;
}