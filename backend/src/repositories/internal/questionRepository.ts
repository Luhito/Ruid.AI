import pool from "@/db.js";
import { DBAccessFailed } from "@/errors/DBAccessFailed.js";
import type { QuestionAbstract } from "@/types/questionAbstract.js";
import type { QuestionSet } from "@/types/questionSet.js";
import type { RepoQuestion } from '@/types/repoQuestion.js'
import { UUID } from '@/types/uuid.js'

/** question_idから問題情報を取得する。検索結果は通常1件であり、0件の場合はnullを返す */
export const findByQuestionId = async (questionId: UUID): Promise<RepoQuestion | null> => {
    const dbaccesser_name = "questionRepository.findByQuestionId";

    let result = null;

    try {
        result = await pool.query(
            `
            SELECT
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
    }
    catch(e){
        throw new DBAccessFailed(dbaccesser_name, e);
    }
    
    // 検索結果0件ならnullを返す
    if (!(result.rows[0])) {
        return null;
    }

    return result.rows[0];
}

export const findSolvedQuestionsByRoomId = async (room_id: UUID): Promise<QuestionAbstract[] | null> => {
    const dbaccesser_name = "questionRepository.findByQuestionId";

    let result = null;

    try {
        result = await pool.query(
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
    }
    catch(e){
        throw new DBAccessFailed(dbaccesser_name, e);
    }
    
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
    const dbaccesser_name = "questionRepository.findUnsolvedByRoomId";

    let result = null;

    try {
        result = await pool.query(
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
    }
    catch(e){
        throw new DBAccessFailed(dbaccesser_name, e);
    }
    
    // 検索結果0件ならnullを返す
    if (!(result.rows[0])) {
        return null;
    }

    return UUID.create(result.rows[0].question_id)
}

export const getUnsolvedQuestionCount = async (roomId: UUID): Promise<number | null> => {
    const dbaccesser_name = "questionRepository.findUnsolvedByRoomId";

    let result = null;

    try {
        result = await pool.query(
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
    }
    catch(e){
        throw new DBAccessFailed(dbaccesser_name, e);
    }
    
    // 検索結果0件ならnullを返す
    if (!(result.rows[0])) {
        return null;
    }

    return Number(result.rows[0].count);
}

export const insertQuestion = async (question: QuestionSet): Promise<UUID> => {
    const dbaccesser_name = "questionRepository.findUnsolvedByRoomId";

    const newQuestionId = UUID.generate();
    const createUserId = UUID.create('01a09db5-6b0f-7b2c-b215-c1a99a0589af');

    try {
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
                newQuestionId.toString(),
                createUserId.toString(),
                question.room_id.toString(),
                question.question_text,
                question.explanation_text,
                question.summary
            ]
        )
    }
    catch(e){
        throw new DBAccessFailed(dbaccesser_name, e);
    }

    return newQuestionId;
}