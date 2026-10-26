import * as repositories from '@/repositories/index.js'
import * as services from '@/services/index.js'
import { UUID } from "@/types/uuid.js"
import { QuestionGenerationError } from '@/errors/internal/QuestionGenerationError.js'
import { chatGPTClient, type chatGPTClientTypes } from '@/services/index.js'
import type { Choice } from '@/types/repository/choice.js';

export const generateQuestion = async (roomId: UUID) => {
    // ⬛︎ DBからroom情報を取得
    const q = {
        query: "test query",
        pastQuestionSummaries: []
    } satisfies chatGPTClientTypes.GenerateQuestionCandidateQuery;
    if (!q) {
        throw new QuestionGenerationError(roomId);
    }

    // ★ ChatGPTで問題生成を行う
    const genRes = await chatGPTClient.generateQuestionCandidate(q);
    if (!genRes) {
        throw new QuestionGenerationError(roomId);
    }
    
    // ★ 生成した問題のバリデーションが通ったら問題をDBへ保存(バリデーションは現時点で必ずtrue)
    if (await chatGPTClient.verifyQuestion(genRes)){
        // 作成ユーザーIDを取得（リクエストから取得する形にしたいが、今はまだ固定値）
        const createUserId = UUID.create('01a09db5-6b0f-7b2c-b215-c1a99a0589af');

        // 生成した問題をDBへ格納
        const newQuestion = services.questions.buildFromCandidate(genRes, createUserId, roomId);
        await repositories.questions.insertQuestion(newQuestion);

        // 生成した問題の選択肢をDBへ格納
        let cnt = 0;
        for (const choiceCandidate of genRes.choices) {
            const newChoice = services.choices.buildFromCandidate(choiceCandidate, newQuestion.questionId);
            await repositories.choices.insert(newChoice);
            cnt++;
        }
        
        console.log(`Question generation successfully completed! cnt:${cnt}`);
    }
}