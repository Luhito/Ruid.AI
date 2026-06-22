import type { Request, Response } from "express";

export const getQuestion = (
    req: Request,
    res: Response
) => {
    // qid: string, userAgent: string, acceptLanguage: string
    // const qid = 

    const stub_res = {
        question_text: "サンプル問題文",
        choices: [
            {tag: "A", text: "サンプル選択肢1"},
            {tag: "B", text: "サンプル選択肢2"},
            {tag: "C", text: "サンプル選択肢3"},
            {tag: "D", text: "サンプル選択肢4"},
        ],
        explanation_text: "サンプル解説文",
        correct_answer_index: 1
    }
    
    res.json(stub_res);
}