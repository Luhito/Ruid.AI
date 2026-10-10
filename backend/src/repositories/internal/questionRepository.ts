import pool from "@/db.js";
import type { QuestionAbstract } from "@/types/questionAbstract.js";
import type { RepoQuestion } from "@/types/repository/repoQuestion.js";
import type { Question } from "@/types/repository/question.js";
import { UUID } from '@/types/uuid.js'

/** question_idから問題情報を取得する。検索結果は通常1件であり、0件の場合はnullを返す */
export const findByQuestionId = async (questionId: UUID): Promise<RepoQuestion | null> => {
    const result = await pool.query(
        `
        SELECT
            create_user_id,
            room_id,
            question_text,
            explanation_text,
            answered_flg,
            summary
        FROM
            questions
        WHERE
            question_id = $1
        `, 
        [questionId.toString()]
    );
    
    // 検索結果0件ならnullを返す
    if (!(result.rows[0])) {
        return null;
    }

    return {
        createUserId: result.rows[0].create_user_id,
        roomId: result.rows[0].room_id,
        questionText: result.rows[0].question_text,
        explanationText: result.rows[0].explanation_text,
        answeredFlg: result.rows[0].answered_flg,
        summary: result.rows[0].summary
    } satisfies RepoQuestion;
}

export const findSolvedQuestionsByRoomId = async (room_id: UUID): Promise<QuestionAbstract[] | null> => {
    const result = await pool.query(
        `
        SELECT
            question_id,
            summary
        FROM
            questions
        WHERE
            room_id = $1 AND
            answered_flg = true
        ORDER BY
            updated_at
        `, 
        [room_id.toString()]
    );

    // 検索結果0件ならnullを返す
    if (!(result.rows[0])) {
        return null;
    }

    return result.rows.map((value) => {
        return {
            title: value.summary,
            questionId: UUID.create(value.question_id)
        }
    })
}

export const findSingleUnsolvedQuestionByRoomId = async (room_id: UUID): Promise<UUID | null> => {
    const result = await pool.query(
        `
        SELECT
            question_id
        FROM
            questions
        WHERE
            room_id = $1 AND
            answered_flg = false
        ORDER BY
            created_at
        LIMIT 1
        `, 
        [room_id.toString()]
    );

    // 検索結果0件ならnullを返す
    if (!(result.rows[0])) {
        return null;
    }

    return UUID.create(result.rows[0].question_id)
}

export const getUnsolvedQuestionCount = async (roomId: UUID): Promise<number | null> => {
    const result = await pool.query(
        `
        SELECT
            COUNT(*)
        FROM
            questions
        WHERE
            room_id = $1 AND
            answered_flg = false
        `, 
        [roomId.toString()]
    );

    // 検索結果0件ならnullを返す
    if (!(result.rows[0])) {
        return null;
    }

    return Number(result.rows[0].count);
}

export const insertQuestion = async (question: Question): Promise<UUID> => {

    await pool.query(
        `
        INSERT INTO questions (
            question_id,
            create_user_id,
            room_id,
            question_text,
            explanation_text,
            summary
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        )
        `, 
        [
            question.questionId.toString(),
            question.createUserId.toString(),
            question.roomId.toString(),
            question.questionText,
            question.explanationText,
            question.summary
        ]
    )

    return question.questionId;
}