import pool from "@/db.js";
import type { Question } from '@/types/question.js'
import type { UUID } from '@/types/uuid.js'

/** qidから問題情報を取得する。検索結果は通常1件であり、0件の場合はnullを返す */
export const findByQid = async (qid: UUID): Promise<Question | null> => {
    const result = await pool.query(
        `
        SELECT
            question_text,
            explanation_text
        FROM
            questions
        WHERE
            qid = $1
        `, 
        [qid.toString()]
    );

    // 検索結果0件なら
    if (!(result.rows[0])) {
        return null;
    }

    return {
        questionText: result.rows[0].question_text,
        explanationText: result.rows[0].explanation_text,
    }
}