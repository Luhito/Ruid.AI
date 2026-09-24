import pool from "@/db.js";
import { UUID } from '@/types/uuid.js'
import type { ChoiceGroup } from '@/types/choiceGroup.js'
import type { Choice } from "@/types/choice.js";
import { DBAccessFailed } from "@/errors/DBAccessFailed.js";

/** question_idからchoicesを取得する。通常はChoiceGroupを返すが、検索結果がない場合や正答が検索されなかった場合はnullを返す。 */
export const findByQuestionId = async (question_id: UUID): Promise<ChoiceGroup | null> => {
    const dbaccesser_name = "choiceRepository.findByQuestionId";

    let result = null;

    try {
        result = await pool.query(
            `
            SELECT
                choice_label,
                choice_text,
                is_correct
            FROM
                choices
            WHERE
                question_id = $1
            ORDER BY
                id
            `,
            [question_id.toString()]
        );
    }
    catch(e){
        throw new DBAccessFailed(dbaccesser_name, e)
    }

    if (!(result.rows[0])){
        return null;
    }
    
    return {
        choices: result.rows.map((row) => ({
            tag: row.choice_label,
            text: row.choice_text
        } satisfies Choice)),
        correctAnswerIndex: result.rows.findIndex(row => row.is_correct)
    }
}