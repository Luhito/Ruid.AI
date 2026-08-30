import pool from "@/db.js";
import type { components } from "gen/openapi.js"

/** 問題検索用SQL */
const selectQuestion = `
    SELECT
        question_text,
        explanation_text
    FROM
        questions
    WHERE
        qid = $1
    `;

/** 選択肢検索用SQL */
const selectChoices = `
    SELECT
        choice_label AS tag,
        choice_text AS text,
        is_correct
    FROM
        choices
    WHERE
        qid = $1
    ORDER BY
        id
`;

type GetQuestion200ResponseContent =
    components["responses"]["getQuestionResponse"]["content"]["application/json"];
type ErrorResponse = 
    components["schemas"]["errorResponse"];

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const getQuestion = async (qid: any): Promise<GetQuestion200ResponseContent | ErrorResponse> => {
    // 引数のバリデーション
    if (typeof qid !== "string") {
        return {
            statusCode: 400,
            errorCode: "QID_NOT_VALID",
            content: {
                message: "qid is required"
            }
        } satisfies ErrorResponse;
    }
    if (!uuidPattern.test(qid)) {
        return {
            statusCode: 400,
            errorCode: "QID_NOT_VALID",
            content: {
                message: "qid must be UUID"
            }
        } satisfies ErrorResponse;
    }

    // questionテーブル検索
    const result_question = await pool.query(selectQuestion, [qid]);

    // 検索結果が0件ならエラーを返す
    if ((result_question.rowCount ?? 0) === 0) {
        return {
            statusCode: 404,
            errorCode: "SELECT_0_QUESTIONS",
            content: {
                message: "specified question doesn't exist"
            }
        } satisfies ErrorResponse;
    }

    // 検索結果の取得
    const question = result_question.rows[0];
    const question_text = question.question_text;
    const question_explanation = question.explanation_text;

    // choicesテーブルの検索
    const result_choices = await pool.query(selectChoices, [qid]);
    
    // 検索結果が0件ならエラーを返す
    if ((result_choices.rowCount ?? 0) === 0) {
        return {
            statusCode: 500,
            errorCode: "SELECT_0_CHOICES",
            content: {
                message: "specified qid of choices not correctly created"
            }
        } satisfies ErrorResponse;
    }

    // 検索結果の取得
    /** 選択肢 */
    const choices: GetQuestion200ResponseContent["content"]["choices"] = result_choices.rows.map(row => ({
        tag: row.tag,
        text: row.text
    }));

    /** 正解の選択肢インデックス */
    const correct_answer_index = result_choices.rows.findIndex(row => row.is_correct);
    if (correct_answer_index === -1) {
        return {
            statusCode: 500,
            errorCode: "SELECT_0_CORRECT_CHOICES",
            content: {
                message: "choices of a question not correctly created"
            }
        } satisfies ErrorResponse;
    }

    // questionsとchoicesから検索結果作成
    return {
        statusCode: 200,
        content: {
            question_text: question_text,
            choices: choices,
            explanation_text: question_explanation,
            correct_answer_index: correct_answer_index
        }
    } satisfies GetQuestion200ResponseContent;
}