import pool from "@/db.js";
import { UUID } from '@/types/uuid.js'
import type { Choice } from "@/types/repository/choice.js";

/** question_idからchoicesを取得する。通常はChoiceGroupを返すが、検索結果がない場合や正答が検索されなかった場合はnullを返す。 */
export const findByQuestionId = async (questionId: UUID): Promise<Choice[] | null> => {
    const result = await pool.query(
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
        [questionId.toString()]
    );

    if (!(result.rows[0])){
        return null;
    }
    
    return result.rows.map((row) => ({
        questionId: questionId,
        tag: row.choice_label,
        text: row.choice_text,
        isCorrect: row.is_correct
    }))
}

export const findByIdAndLabel = async (questionId: UUID, label: string): Promise<Choice | null> => {
    const result = await pool.query(
        `
        SELECT
            choice_text,
            is_correct
        FROM
            choices
        WHERE
            question_id = $1
            AND choice_label = $2
        `,
        [
            questionId.toString(),
            label
        ]
    )

    if (!(result.rows[0])){
        return null;
    }
    
    return {
        questionId: questionId,
        tag: label,
        text: result.rows[0].choice_text,
        isCorrect: result.rows[0].is_correct
    }
}

export const insert = async (choice: Choice) => {
    await pool.query(
        `
        INSERT
        INTO choices (
            question_id,
            choice_label,
            choice_text,
            is_correct
        )
        VALUES (
            $1,
            $2,
            $3,
            $4
        )
        `,
        [
            choice.questionId.toString(),
            choice.tag,
            choice.text,
            choice.isCorrect
        ]
    )
}