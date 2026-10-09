import * as repositories from '@/repositories/index.js';
import * as services from '@/services/index.js';
import { UUID } from "@/types/uuid.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import type { QuestionSet } from '@/types/questionSet.js';

export const getQuestionSet = async (question_id: UUID): Promise<QuestionSet> => {
    // ■ questionテーブル検索
    const repo_question = await repositories.questions.findByQuestionId(question_id);

    // 検索結果が0件ならエラーを返す
    if (!repo_question) {
        throw new NotFoundError("questions.findByQuestionId");
    }

    // ■ choicesテーブルの検索
    const repo_choice = await repositories.choices.findByQuestionId(question_id);
    
    // 検索結果が0件ならエラーを返す
    if (!repo_choice) {
        throw new NotFoundError("choices.findByQuestionId");
    }
    // 正解の選択肢が無いならエラーを返す
    if (repo_choice.correctAnswerIndex === -1) {
        throw new NotFoundError("choices.findByquestion_id.correctAnswerIndex");
    }

    // ※副作用：ルームに新しい問題を作成
    if (repo_question.room_id) {
        services.room.createQuestion(UUID.create(repo_question.room_id));
    }

    // questionsとchoicesから検索結果作成
    return {
        room_id: UUID.create(repo_question.room_id),
        question_text: repo_question.questionText,
        choices: repo_choice.choices,
        explanation_text: repo_question.explanationText,
        correct_answer_index: repo_choice.correctAnswerIndex,
        answered_flg: repo_question.answered_flg,
        summary: repo_question.summary
    };
}