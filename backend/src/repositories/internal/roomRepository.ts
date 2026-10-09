import pool from "@/db.js";
import { UUID } from '@/types/uuid.js'
import type { Room } from "@/types/repository/room.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import { DBAccessFailed } from "@/errors/DBAccessFailed.js";

/** question_idからchoicesを取得する。通常はChoiceGroupを返すが、検索結果がない場合や正答が検索されなかった場合はnullを返す。 */
export const findByRid = async (room_id: UUID): Promise<Room | null> => {
    const dbaccesser_name = "roomRepository.findByRid";

    let rs = null;
    
    try {
        // ■ roomの各項目を取得
        rs = await pool.query(
            `
            SELECT
                title,
                user_id,
                prompt,
                answer_type
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
    if (!(rs.rows[0])){
        return null;
    }

    // 検索結果があるなら検索結果を返す
    return {
        userId: rs.rows[0].user_id,
        prompt: rs.rows[0].prompt,
        answerType: rs.rows[0].answer_type,
        title: rs.rows[0].title
    }
}

export const getRemainingQuestionCount = async (roomId: UUID): Promise<number | null> => {
    const dbaccesser_name = "roomRepository.getRemainingQuestionCount";

    let rs = null;
    
    try {
        // ■ 未回答問題の残数を取得
        rs = await pool.query(
            `
            SELECT
                count(*)
            FROM
                questions
            WHERE
                room_id = $1
                AND answered_flg = false
            `,
            [roomId.toString()]
        )

        // 検索結果が0件ならnullを返す
        if (!(rs.rows[0])){
            return null;
        }

    }
    catch(e){
        throw new DBAccessFailed(dbaccesser_name, e);
    }

    return Number(rs.rows[0].count);
}