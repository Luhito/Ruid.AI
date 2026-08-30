import type { Request, Response } from "express";
import { createError } from "../shared-components/error.js"
import * as services from "../services/question/index.js"

export const getQuestion = async (req: Request, res: Response) => {
    /** パスパラメータから受け取った問題ID */
    const qid = req.params.qid;

    // 問題取得
    const result = await services.getQuestion(qid);

    // 結果をクライアントへ返却
    res
        .status(result.statusCode)
        .json(result.content);
}

export const postQuestion = async (
    req: Request,
    res: Response
) => {
    /** リクエストボディから受け取ったプロンプト */
    const { prompt } = req.body;
    
    /** リクエストヘッダから受け取った言語 */
    // const acceptLanguage = req.get("Accept-Language") ? req.get("Accept-Language") : "ja";

    try {

        // 問題取得
        const result = await services.postQuestion(false);

        // ヘッダーが存在しない = エラー
        if (!result.headers) {
            res
                .status(result.statusCode)
                .json(result.content);
        }
        
        res
            .status(result.statusCode)
            .set(result.headers)
            .json(result.content);
    }
    catch {
        return res.status(500).json({ error: "internal server error" });
    }
}
