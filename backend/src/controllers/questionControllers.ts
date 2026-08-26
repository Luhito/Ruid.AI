import type { Request, Response } from "express";
import pool from "../db.js";
import { createError } from "../shared-components/error.js"
import type { components } from "gen/openapi.js"

type GetQuestion200ResponseContent =
    components["responses"]["getQuestionResponse"]["content"]["application/json"];

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const getQuestion = async (
    req: Request,
    res: Response
) => {
    // *** 定数・変数定義 ***
    /** 関数名 */
    const functionName = "getQuestion"
    /** 問題検索用SQL */
    const selectQuestion = `
        SELECT
            question_text,
            description_text AS explanation_text
        FROM
            questions
        WHERE
            qid = $1
        `;
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
    /** パスパラメータから受け取った問題ID */
    const { qid } = req.params;

    /** リクエストヘッダから受け取った言語 */
    // const acceptLanguage = req.get("Accept-Language") ? req.get("Accept-Language") : "ja";

    
    let label = 0;

    // *** 処理開始 ***
    try {
        // qidが無指定のときはBad Request
        if (typeof qid !== "string") {
            return res.status(400).json({
                error: "qid is required",
            });
        }
        if (!uuidPattern.test(qid)) {
            return res.status(400).json({
                error: "qid must be UUID",
            });
        }

        // question検索
        label = 10;
        const result_question = await pool.query(selectQuestion, [qid]);

        // question検索結果取得
        label = 20;
        if ((result_question.rowCount ?? 0) === 0) {
            return res.status(404).json({ error: "question not found" });
        }
        const question = result_question.rows[0];
        const question_text = question.question_text;
        const question_explanation = question.explanation_text;

        // choices検索
        label = 30;
        const result_choices = await pool.query(selectChoices, [qid]);

        // choices検索結果取得
        if ((result_choices.rowCount ?? 0) === 0) {
            return res.status(500).json({ error: "Internal server error: choices of a question not created" });
        }
        const choices: GetQuestion200ResponseContent["choices"] = result_choices.rows.map(row => ({
            tag: row.tag,
            text: row.text
        }));
        const correct_answer_index = result_choices.rows.findIndex(row => row.is_correct);
        if (correct_answer_index === -1) {
            return res.status(500).json({ error: "Internal server error: correct choice of a question not created" });
        }

        // DB検索結果から下り電文作成
        label = 40;
        const result: GetQuestion200ResponseContent = {
            question_text: question_text,
            choices: choices,
            explanation_text: question_explanation,
            correct_answer_index: correct_answer_index
        }

        res.status(200).json(result);
    }
    catch (e) {
        createError(`${functionName}でエラーが発生しました`, label, e);
        return res.status(500).json({ error: "internal server error" });
    }
}

export const postQuestion = async (
    req: Request,
    res: Response
) => {
    // *** 定数・変数定義 ***
    /** 関数名 */
    const functionName = "postQuestion"
    let label = 0;

    /** Response Schema */
    type GetQuestion200ResponseContent =
        components["responses"]["createQuestionResponse"]["content"]["application/json"];
    type GetQuestion200ResponseHeader =
        components["responses"]["createQuestionResponse"]["headers"];

    try {
        label = 10;
        /** リクエストボディから受け取ったプロンプト */
        const { prompt } = req.body;

        label = 20;

        const stub_header: GetQuestion200ResponseHeader = {
            Location: "question/tsetqid"
        }

        const stub_content: GetQuestion200ResponseContent =  {
            qid: "tsetqid"
        }

        res
          .status(201)
          .set(stub_header)
          .json(stub_content);
    }
    catch (e) {
        createError(`${functionName}でエラーが発生しました`, label, e);
        return res.status(500).json({ error: "internal server error" });
    }
}
