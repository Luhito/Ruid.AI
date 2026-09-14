// import pool from "@/db.js";
import type { components } from "gen/openapi.js"

type PostQuestion201ResponseContent =
    components["responses"]["createQuestionResponse"]["content"]["application/json"];
type PostQuestion201ResponseHeader = 
    components["responses"]["createQuestionResponse"]["headers"];
type ErrorResponse = 
    components["schemas"]["errorResponse"];
type PostQuestion201Response = 
    components["responses"]["createQuestionResponse"];

export const postQuestion = async (prompt: string) => {
    const stub_header: PostQuestion201ResponseHeader = {
        Location: "question/tsetqid"
    }

    const stub_content: PostQuestion201ResponseContent = {
        qid: "tsetqid"
    }

    if (!prompt) {
        return {
            errorCode: "POST_QUESTION_TEST_ERROR",
            content: {
                message: "this is post question test"
            }
        } satisfies ErrorResponse;
    }

    return {
        headers: stub_header,
        content: {
            "application/json": stub_content
        }
    } satisfies PostQuestion201Response
}