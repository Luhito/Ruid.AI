import { CreateQuestionError } from '@/errors/index.js';
import * as repositories from '@/repositories/index.js';
import * as services from '@/services/index.js'
import type { UUID } from "@/types/uuid.js";

const MIN_REMAINING_QUESTION_COUNT = 5;

export const createQuestion = async (roomId: UUID) => {
    // ■ 問題残数取得
    const remainingQuestionCount = await repositories.rooms.getRemainingQuestionCount(roomId);
    if (!remainingQuestionCount) {
        throw new CreateQuestionError({message: "result of remainingQuestionCount is null."}, roomId);
    }

    // 問題残数が生成閾値より小さい分だけ繰り返し
    for (let i = MIN_REMAINING_QUESTION_COUNT; i > remainingQuestionCount; i--) {
        // 問題生成
        services.questions.generateQuestion(roomId);   // awaitしない
    }
}