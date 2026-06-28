import type { Request, Response } from "express";
import pool from "../db.js";

export const getQuestion = async (
    req: Request,
    res: Response
) => {
    // *** 定数定義 ***
    /** 問題の存在チェック用SQL */
    const selectExistsQuestion = `
        SELECT EXISTS (
            SELECT 1 FROM questions WHERE qid = $1
        )`
    /** リクエストパラメータから受け取った問題ID */
    const qid = req.query.qid;
    /** リクエストヘッダから受け取った言語 */
    const acceptLanguage = req.get("Accept-Language") ? req.get("Accept-Language") : "ja";

    // *** 処理開始 ***
    // qidが無指定のときはBad Request
    if (typeof qid !== "string") {
        return res.status(400).json({
            error: "qid is required",
        });
    }

    const result = await pool.query(selectExistsQuestion, [qid]);

    const stub_res = {
        question_text: "サンプル問題文",
        choices: [
            {tag: "A", text: "サンプル選択肢1"},
            {tag: "B", text: "サンプル選択肢2"},
            {tag: "C", text: "サンプル選択肢3"},
            {tag: "D", text: "サンプル選択肢4"},
        ],
        explanation_text: "サンプル解説文",
        correct_answer_index: 1
    }
    
    res.json(stub_res);
}