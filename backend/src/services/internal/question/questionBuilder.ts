import type { Question } from '@/types/repository/question.js';
import type * as types from '../clients/openai/chatGPTClient.types.js'
import { UUID } from '@/types/uuid.js';

export const build = (
    seed: types.GenerateQuestionCandidateResponse,
    createUserId: UUID,
    roomId: UUID,
): Question => {
    const newQuestionId = UUID.generate();

    return {
        questionId: newQuestionId,
        createUserId: createUserId,
        roomId: roomId,
        questionText: seed.questionText,
        explanationText: seed.explanationText,
        summary: seed.summary,
        choices: seed.choices.map((choice) => {
            return {
                tag: choice.tag,
                text: choice.text,
                questionId: newQuestionId,
                isCorrect: choice.isCorrect,
            }
        }),
        correctAnswerIndex: seed.correctAnswerIndex,
        answeredFlg: null,
    }
}