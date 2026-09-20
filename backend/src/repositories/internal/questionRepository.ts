import pool from "@/db.js";
import { DBAccessFailed } from "@/errors/DBAccessFailed.js";
import type { RepoQuestion } from '@/types/repoQuestion.js'
import type { UUID } from '@/types/uuid.js'

/** question_idから問題情報を取得する。検索結果は通常1件であり、0件の場合はnullを返す */
export const findByquestion_id = async (question_id: UUID): Promise<RepoQuestion | null> => {
    const dbaccesser_name = "questionRepository.findByRid";

    let result = null;

    try {
        result = await pool.query(
            `
            SELECT
                room_id,
                question_text,
                explanation_text
            FROM
                questions
            WHERE
                question_id = $1
            `, 
            [question_id.toString()]
        );
    }
    catch(e){
        throw new DBAccessFailed(dbaccesser_name, e);
    }
    
    // 検索結果0件ならnullを返す
    if (!(result.rows[0])) {
        return null;
    }

    return {
        room_id: result.rows[0].room_id,
        questionText: result.rows[0].question_text,
        explanationText: result.rows[0].explanation_text,
    }
}