import { questions, choices } from '@/repositories/index.js'
import { UUID } from "@/types/uuid.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import type { QuestionSet } from '@/types/questionSet.js';
import { removeBoxTransforms } from 'framer-motion';

export const getQuestionSet = async (question_id: UUID): Promise<QuestionSet> => {
    // ■ questionテーブル検索
    const repo_question = await questions.findByquestion_id(question_id);

    // 検索結果が0件ならエラーを返す
    if (!repo_question) {
        throw new NotFoundError("questions.findByquestion_id");
    }

    // ■ choicesテーブルの検索
    const repo_choice = await choices.findByquestion_id(question_id);
    
    // 検索結果が0件ならエラーを返す
    if (!repo_choice) {
        throw new NotFoundError("choices.findByquestion_id");
    }
    // 正解の選択肢が無いならエラーを返す
    if (repo_choice.correctAnswerIndex === -1) {
        throw new NotFoundError("choices.findByquestion_id.correctAnswerIndex");
    }

    // questionsとchoicesから検索結果作成
    return {
        room_id: repo_question.room_id,
        question_text: repo_question.questionText,
        choices: repo_choice.choices,
        explanation_text: repo_question.explanationText,
        correct_answer_index: repo_choice.correctAnswerIndex
    };
}