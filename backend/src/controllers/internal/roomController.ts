import type { Request, Response } from "express";
import * as services from "@/services/index.js"
import { UuidValidationError } from "@/errors/internal/UuidValidationError.js";
import { NotFoundError } from "@/errors/internal/NotFoundError.js";
import type { components } from "gen/openapi.js";
import { UUID } from "@/types/uuid.js";

type ErrorResponseContent = components["responses"]["errorResponse"]["content"]["application/json"]["content"];

export const getRoom = async (req: Request, res: Response) => {
    type responseContentType = components["responses"]["getRoomResponse"]["content"]["application/json"];

    try {
        // パスパラメータのuuidを取得&バリデーション
        const room_id = UUID.create(req.params.room_id);

        // 問題取得
        const result = await services.rooms.getRoom(room_id);

        // 結果をクライアントへ返却
        res.status(200).json(result satisfies responseContentType);
    }
    catch(e) {
        // UUIDのバリデーションに失敗
        if(e instanceof UuidValidationError){
            res.status(400)
                .json({
                    message: `room_id is not valid. room_id: ${req.params.room_id}`
                } satisfies ErrorResponseContent)
        }
        // room_idに対応するRoomが見つからなかった
        else if(e instanceof NotFoundError){
            console.error(`Error: Question not found. req: ${req.params.room_id}, meaasge: ${e}`)
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

export const postRoom = async (req: Request, res: Response) => {
    try {
        /** リクエストボディから受け取ったプロンプト */
        const prompt = req.body.prompt;
        
        /** リクエストヘッダから受け取った言語 */
        // const acceptLanguage = req.get("Accept-Language") ? req.get("Accept-Language") : "ja";

        /** ルームID */
        // const room_id = UUID.generate();
        const room_id = "01a09db5-6b0f-7a9a-9a76-df21bc1cfd0f";

        // ルームの初期化 (awaitしない)
        // services.initRoom(room_id, prompt);

        // 問題作成 (awaitしない)
        // const result = services.createQuestion(room_id, prompt);

        // 結果をクライアントへ返却
        res.status(201)
            .set({
                Location: `rooms/${room_id}`
            } satisfies components["responses"]["createRoomResponse"]["headers"])
            .json({
                room_id: room_id
            } satisfies components["responses"]["createRoomResponse"]["content"]["application/json"]);
    }
    catch {
        return res.status(500).json({ error: "internal server error" });
    }
}

export const getQuestionsByRoomId = async (req: Request, res: Response) => {
    type responseContentType = components["responses"]["getQuestionsByRoomIdResponse"]["content"]["application/json"];

    try {
        // パスパラメータのuuidを取得&バリデーション
        const room_id = UUID.create(req.params.room_id);

        // 問題リスト取得
        const result = await services.rooms.getQuestionsByRoomId(room_id);

        // 結果をクライアントへ返却
        res.status(200).json(result.map((value) => {
            return {
                question_id: value.questionId.toString(),
                summary: value.title
            }
        }) satisfies responseContentType);
    }
    catch(e) {
        // UUIDのバリデーションに失敗
        if(e instanceof UuidValidationError){
            res.status(400)
                .json({
                    message: `room_id is not valid. room_id: ${req.params.room_id}`
                } satisfies ErrorResponseContent)
        }
        // room_idに対応する問題が見つからなかった
        else if(e instanceof NotFoundError){
            console.error(`Error: Question not found. req: ${req.params.room_id}, meaasge: ${e}`)
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

export const getNewQuestionId = async (req: Request, res: Response) => {
    type responseContentType = components["responses"]["getNewQuestionIdResponse"]["content"]["application/json"];

    try {
        // パスパラメータのuuidを取得&バリデーション
        const room_id = UUID.create(req.params.room_id);

        // 問題リスト取得
        const result = await services.rooms.getNewQuestionId(room_id);

        // 結果をクライアントへ返却
        res.status(200).json({
            question_id: result.toString()
        } satisfies responseContentType);
    }
    catch(e) {
        // UUIDのバリデーションに失敗
        if(e instanceof UuidValidationError){
            res.status(400)
                .json({
                    message: `room_id is not valid. room_id: ${req.params.room_id}`
                } satisfies ErrorResponseContent)
        }
        // room_idに対応する新しい問題が見つからなかった
        else if(e instanceof NotFoundError){
            console.error(`Error: New question not found. req: ${req.params.room_id}, meaasge: ${e}`)
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