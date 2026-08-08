import type { Request, Response } from "express";
// import pool from "../db.js";
import { createError } from "../shared-components/error.js"
import type { components } from "gen/openapi.js"

export const getQuestion = async (
    req: Request,
    res: Response
) => {
    // *** 定数・変数定義 ***
    /** 関数名 */
    const functionName = "getQuestion"
    /** 問題の存在チェック用SQL */
    // const selectExistsQuestion = `
    //     SELECT EXISTS (
    //         SELECT 1 FROM questions WHERE qid = $1
    //     )`
    /** パスパラメータから受け取った問題ID */
    const { qid } = req.params;

    /** リクエストヘッダから受け取った言語 */
    // const acceptLanguage = req.get("Accept-Language") ? req.get("Accept-Language") : "ja";

    /** Response Schema */
    type GetQuestion200ResponseContent =
        components["responses"]["getQuestionResponse"]["content"]["application/json"];

    const stub_res: GetQuestion200ResponseContent = {
        question_text: "サンプル問題文",
        choices: [
            { tag: "A", text: "サンプル選択肢1" },
            { tag: "B", text: "サンプル選択肢2" },
            { tag: "C", text: "サンプル選択肢3" },
            { tag: "D", text: "サンプル選択肢4" },
        ],
        explanation_text: "サンプル解説文",
        correct_answer_index: 1
    }
    let label = 0;

    // *** 処理開始 ***
    try {
        // qidが無指定のときはBad Request
        if (typeof qid !== "string") {
            return res.status(400).json({
                error: "qid is required",
            });
        }

        label = 10;
        // const result = await pool.query(selectExistsQuestion, [qid]);

        label = 20;
        // DB検索結果から下り電文作成
        // res = ...

        res.status(200).json(stub_res);
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