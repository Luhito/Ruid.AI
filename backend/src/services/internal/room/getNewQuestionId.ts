import { questions } from '@/repositories/index.js'
import { UUID } from "@/types/uuid.js";
import { NotFoundError } from "@/errors/internal/NotFoundError.js";

export const getNewQuestionId = async (room_id: UUID): Promise<UUID> => {
    // ■ questionsテーブル検索
    const repo_questions = await questions.findSingleUnsolvedQuestionByRoomId(room_id);
    
    // 検索結果が0件ならエラーを返す
    if (!repo_questions){
        throw new NotFoundError(room_id.toString())
    }

    // 検索結果作成
    return repo_questions;
}