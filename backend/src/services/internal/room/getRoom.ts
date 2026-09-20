import { rooms } from '@/repositories/index.js'
import { UUID } from "@/types/uuid.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import type { Room } from '@/types/room.js';

export const getRoom = async (room_id: UUID): Promise<Room> => {
    // ■ roomテーブル検索
    const repo_room = await rooms.findByRid(room_id);
    
    // 検索結果が0件ならエラーを返す
    if (!repo_room){
        throw new NotFoundError(room_id.toString())
    }

    // 検索結果作成
    return {
        title: repo_room.title
    };
}