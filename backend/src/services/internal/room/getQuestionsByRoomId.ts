import { questions } from '@/repositories/index.js'
import { UUID } from "@/types/uuid.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import type { QuestionAbstract } from '@/types/questionAbstract.js';

export const getQuestionsByRoomId = async (room_id: UUID): Promise<QuestionAbstract[]> => {
    // ■ questionsテーブル検索
    const repo_questions = await questions.findByRoomId(room_id);
    
    // 検索結果が0件ならエラーを返す
    if (!repo_questions){
        throw new NotFoundError(room_id.toString())
    }

    // 検索結果作成
    return repo_questions;
}