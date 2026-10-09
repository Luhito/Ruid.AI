import * as repositories from '@/repositories/index.js'
import type { UUID } from "@/types/uuid.js";
import * as chatGPTClient from "../clients/openai/chatGPTClient.js";
import { QuestionGenerationError } from '@/errors/QuestionGenerationError.js'

export const generateQuestion = async (roomId: UUID) => {
    // ⬛︎ get room information from DB
    const q = {
        query: "test query",
        pastQuestionSummaries: []
    }
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
        await repositories.questions.insertQuestion(genRes);
        console.log('Question generation successfully completed!');
    }
}