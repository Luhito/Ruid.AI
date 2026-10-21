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
            answer_status,
            summary,
            answer_type
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
        answerStatus: result.rows[0].answer_status,
        summary: result.rows[0].summary,
        answerType: result.rows[0].answer_type
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
            answer_status = true
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
            answer_status = false
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
            answer_status = false
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
            answer_type,
            question_text,
            explanation_text,
            summary
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
        )
        `, 
        [
            question.questionId.toString(),
            question.createUserId.toString(),
            question.roomId.toString(),
            question.answerType,
            question.questionText,
            question.explanationText,
            question.summary
        ]
    )

    return question.questionId;
}

export const setAnsweredStatus = async (questionId: UUID, isCorrect: boolean) => {
    await pool.query(
        `
        UPDATE questions
        SET    answer_status = $1
        WHERE  question_id   = $2
        `, 
        [
            isCorrect,
            questionId
        ]
    )
}