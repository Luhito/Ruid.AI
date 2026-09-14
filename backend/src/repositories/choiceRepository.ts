import pool from "@/db.js";
import { UUID } from '@/types/uuid.js'
import type { ChoiceGroup } from '@/types/choiceGroup.js'
import type { Choice } from "@/types/choice.js";

/** qidからchoicesを取得する。通常はChoiceGroupを返すが、検索結果がない場合や正答が検索されなかった場合はnullを返す。 */
export const findByQid = async (qid: UUID): Promise<ChoiceGroup> => {
    const result = await pool.query(
        `
        SELECT
            choice_label,
            choice_text,
            is_correct
        FROM
            choices
        WHERE
            qid = $1
        ORDER BY
            id
        `,
        [qid.toString()]
    );

    return {
        choices: result.rows.map((row) => ({
            tag: row.choice_label,
            text: row.choice_text
        } satisfies Choice)),
        correctAnswerIndex: result.rows.findIndex(row => row.is_correct)
    }
}