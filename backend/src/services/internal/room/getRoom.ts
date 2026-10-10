import { rooms } from '@/repositories/index.js'
import { UUID } from "@/types/uuid.js";
import { NotFoundError } from "@/errors/internal/NotFoundError.js";
import type { Room } from '@/types/repository/room.js';

export const getRoom = async (room_id: UUID): Promise<Room> => {
    // ■ roomテーブル検索
    const repoRoom = await rooms.findByRid(room_id);
    
    // 検索結果が0件ならエラーを返す
    if (!repoRoom){
        throw new NotFoundError(room_id.toString())
    }

    // 検索結果作成
    return {
        title: repoRoom.title,
        userId: repoRoom.userId,
        prompt: repoRoom.prompt,
        answerType: repoRoom.answerType
    };
}