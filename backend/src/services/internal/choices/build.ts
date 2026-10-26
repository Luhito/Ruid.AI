import type * as types from '../clients/openai/chatGPTClient.types.js'
import { UUID } from '@/types/uuid.js';
import type { Choice } from '@/types/repository/choice.js';

export const buildFromCandidate = (
    seed: types.GenerateQuestionChoiceCandidate,
    questionId: UUID
): Choice => {
    return {
        questionId: questionId,
        tag: seed.tag,
        text: seed.text,
        isCorrect: seed.isCorrect
    }
}