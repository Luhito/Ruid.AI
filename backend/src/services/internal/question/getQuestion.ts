import * as repositories from '@/repositories/index.js';
import * as services from '@/services/index.js';
import { UUID } from "@/types/uuid.js";
import { NotFoundError } from "@/errors/internal/NotFoundError.js";
import type { Question } from '@/types/repository/question.js';

export const getQuestion = async (questionId: UUID): Promise<Question> => {
    // ■ questionテーブル検索
    const question = await repositories.questions.findByQuestionId(questionId);

    // 検索結果が0件ならエラーを返す
    if (!question) {
        throw new NotFoundError("questions.findByQuestionId");
    }

    // ■ choicesテーブルの検索
    const choices = await repositories.choices.findByQuestionId(questionId);
    // 検索結果が0件ならエラーを返す
    if (!choices) {
        throw new NotFoundError("choices.findByQuestionId");
    }

    // choices内の正答indexを取得
    const correctAnswerIndex = choices.findIndex(choice => choice.isCorrect);
    // 正解の選択肢が無いならエラーを返す
    if (correctAnswerIndex === -1) {
        throw new NotFoundError("choices.findById.correctAnswerIndex");
    }

    // ※副作用：ルームに新しい問題を作成
    if (question.roomId) {
        services.rooms.createQuestion(UUID.create(question.roomId));
    }

    // questionsとchoicesから検索結果作成
    return {
        questionId: questionId,
        createUserId: question.createUserId,
        roomId: question.roomId,
        questionText: question.questionText,
        choices: choices,
        explanationText: question.explanationText,
        correctAnswerIndex: correctAnswerIndex,
        answeredFlg: question.answeredFlg,
        summary: question.summary
    };
}