import type { Request, Response } from "express";
import * as services from "../services/index.js"
import { UuidValidationError } from "@/errors/UuidValidationError.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import type { components } from "gen/openapi.js";
import { UUID } from "@/types/uuid.js";

export const getQuestion = async (req: Request, res: Response) => {
    try {
        // パスパラメータのuuidを取得&バリデーション
        const question_id = UUID.create(req.params.question_id);

        // 問題取得
        const result = await services.getQuestionSet(question_id);

        // 結果をクライアントへ返却
        res.status(200).json(result);
    }
    catch(e) {
        type ErrorResponse = components["responses"]["errorResponse"]["content"]["application/json"];

        // UUIDのバリデーションに失敗
        if(e instanceof UuidValidationError){
            res.status(400)
                .json({
                    message: `question_id is not valid. question_id: ${req.params.question_id}`
                } satisfies ErrorResponse["content"])
        }
        // question_idに対応する問題が見つからなかった
        else if(e instanceof NotFoundError){
            console.error(`Error: Question not found. req: ${req.params.question_id}, meaasge: ${e}`)
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