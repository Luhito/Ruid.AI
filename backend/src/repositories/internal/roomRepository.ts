import pool from "@/db.js";
import { UUID } from '@/types/uuid.js'
import type { Room } from "@/types/room.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import { DBAccessFailed } from "@/errors/DBAccessFailed.js";

/** question_idからchoicesを取得する。通常はChoiceGroupを返すが、検索結果がない場合や正答が検索されなかった場合はnullを返す。 */
export const findByRid = async (room_id: UUID): Promise<Room | null> => {
    const dbaccesser_name = "roomRepository.findByRid";

    let result = null;
    
    try {
        result = await pool.query(
            `
            SELECT
                title
            FROM
                rooms
            WHERE
                room_id = $1
            `,
            [room_id.toString()]
        );
    }
    catch(e){
        throw new DBAccessFailed(dbaccesser_name, e);
    }

    // 検索結果が0件ならnullを返す
    if (!(result.rows[0])){
        return null;
    }

    // 検索結果があるなら検索結果を返す
    return {
        title: result.rows[0].title
    }
}