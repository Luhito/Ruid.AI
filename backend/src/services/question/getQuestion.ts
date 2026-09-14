import type { components } from "gen/openapi.js"
import { questions, choices } from '@/repositories/index.js'
import { UUID } from "@/types/uuid.js";
import { NotFoundError } from "@/errors/NotFoundError.js";

type GetQuestion200ResponseContent =
    components["responses"]["getQuestionResponse"]["content"]["application/json"];

export const getQuestion = async (qid: UUID): Promise<GetQuestion200ResponseContent> => {
    // ■ questionテーブル検索
    const repo_question = await questions.findByQid(qid);

    // 検索結果が0件ならエラーを返す
    if (!repo_question) {
        throw new NotFoundError("questions.findByQid");
    }


    // ■ choicesテーブルの検索
    const repo_choice = await choices.findByQid(qid);
    
    // 検索結果が0件ならエラーを返す
    if (repo_choice.choices.length == 0) {
        throw new NotFoundError("choices.findByQid");
    }
    // 正解の選択肢が無いならエラーを返す
    if (repo_choice.correctAnswerIndex === -1) {
        throw new NotFoundError("choices.findByQid.correctAnswerIndex");
    }

    // questionsとchoicesから検索結果作成
    return {
        question_text: repo_question.questionText,
        choices: repo_choice.choices,
        explanation_text: repo_question.explanationText,
        correct_answer_index: repo_choice.correctAnswerIndex
    } satisfies GetQuestion200ResponseContent;
}