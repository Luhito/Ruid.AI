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

export const postQuestion = async (testbool: boolean) => {
    const stub_header: PostQuestion201ResponseHeader = {
        Location: "question/tsetqid"
    }

    const stub_content: PostQuestion201ResponseContent = {
        statusCode: 201,
        qid: "tsetqid"
    }

    if (!testbool) {
        return {
            statusCode: 500,
            errorCode: "POST_QUESTION_TEST_ERROR",
            content: {
                message: "this is post question test"
            }
        } satisfies ErrorResponse;
    }

    return {
        statusCode: 201,
        headers: stub_header,
        content: stub_content
    }
}