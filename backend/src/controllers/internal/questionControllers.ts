import type { Request, Response } from "express";
import * as services from "../../services/index.js"
import { UuidValidationError } from "@/errors/internal/UuidValidationError.js";
import { NotFoundError } from "@/errors/internal/NotFoundError.js";
import type { components } from "gen/openapi.js";
import { UUID } from "@/types/uuid.js";

export const getQuestion = async (req: Request, res: Response) => {
    try {
        type retType = components["responses"]["getQuestionResponse"]["content"]["application/json"]

        // パスパラメータのuuidを取得&バリデーション
        const question_id = UUID.create(req.params.question_id);

        // 問題取得
        const result = await services.questions.getQuestion(question_id);

        // 結果をクライアントへ返却
        res.status(200).json({
            room_id: result.roomId.toString(),
            question_text: result.questionText,
            choices: result.choices,
            answer_status: result.answerStatus,
            summary: result.summary
        } satisfies retType);
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
            console.error(`Error: Uncought error occured. log below:`)
            console.error(e)
            res.status(500)
                .json({
                    message: "Internal server error occurred"
                })
        }
    }
}

export const submitAnswer = async (req: Request, res: Response) => {
    type retType = components["responses"]["submitAnswerResponse"]["content"]["application/json"];

    try {
        // パスパラメータの問題IDを取得&バリデーション
        const questionId = UUID.create(req.params.question_id);
        // リクエストボディの解答を取得
        const answer = req.body.answer;

        const result = await services.questions.judgeAnswer(questionId, answer)

        // ★スタブ：いったん、全部正解にする
        res.status(201).json({
            is_correct: result.isCorrect,
            explanation: result.explanation
        } satisfies retType)
    }
    catch (e) {

    }
}