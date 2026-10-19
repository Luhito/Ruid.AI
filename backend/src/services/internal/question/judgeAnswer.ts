import * as repositories from '@/repositories/index.js';
import { UUID } from "@/types/uuid.js";
import { NotFoundError } from "@/errors/internal/NotFoundError.js";

export const judgeAnswer = async (
    questionId: UUID,
    answer: string
): Promise<{
    isCorrect: boolean;
    explanation: string;
}> => {
    // ■ questionテーブル検索
    const question = await repositories.questions.findByQuestionId(questionId);

    // 検索結果が0件ならエラーを返す
    if (!question) {
        throw new NotFoundError("questions.findByQuestionId");
    }

    // N択問題の場合は、選択肢TBLを参照して正誤判定を行う
    // ★今はまだ選択問題だけを想定しているので、判定不要
    // if (question.answerType == "N") {
    // }

    // ■ choicesテーブルの検索
    const choice = await repositories.choices.findByIdAndLabel(questionId, answer);
    // 検索結果が0件ならエラーを返す
    if (!choice) {
        throw new NotFoundError("choices.findByIdAndLabel");
    }

    // questionsとchoiceから判定結果作成
    return {
        isCorrect: choice.isCorrect,
        explanation: question.explanationText
    };
}