import type { Request, Response } from "express";
import * as services from "../services/question/index.js"
import { UuidValidationError } from "@/errors/UuidValidationError.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import type { components } from "gen/openapi.js";
import { UUID } from "@/types/uuid.js";

export const getQuestion = async (req: Request, res: Response) => {
    let qid = null;

    try {
        // パスパラメータのuuidを取得
        qid = UUID.create(req.params.qid);

        // 問題取得
        const result = await services.getQuestion(qid);

        // 結果をクライアントへ返却
        res.status(200).json(result);
    }
    catch(e) {
        type ErrorResponse = components["schemas"]["errorResponse"];

        // UUIDのバリデーションに失敗
        if(e instanceof UuidValidationError){
            res.status(400)
                .json({
                    message: `qid is not valid. qid: ${req.params.qid}`
                } satisfies ErrorResponse["content"])
        }
        // qidに対応する問題が見つからなかった
        else if(e instanceof NotFoundError){
            console.error(`Error: Question not found. req: ${qid}, meaasge: ${e}`)
            res.status(404)
                .json({
                    message: "question not found"
                })
        }
        else{
            console.error(`Error: Uncought error occured. log: ${e}`)
            res.status(500)
                .json({
                    message: "Internal server error occurred"
                })
        }
    }
}

export const postQuestion = async (req: Request, res: Response) => {
    try {
        /** リクエストボディから受け取ったプロンプト */
        const prompt = req.body.prompt;
        
        /** リクエストヘッダから受け取った言語 */
        // const acceptLanguage = req.get("Accept-Language") ? req.get("Accept-Language") : "ja";

        // 問題取得
        const result = await services.postQuestion(prompt);

        // 結果をクライアントへ返却
        res.status(201)
            .set(result.headers)
            .json(result.content);
    }
    catch {
        return res.status(500).json({ error: "internal server error" });
    }
}
