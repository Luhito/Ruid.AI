// import { Configuration } from '@/api/generated/configuration';
// import { QuestionApi } from '@/api/generated/api';
// import type { GetQuestionResponse } from '@/api/generated/api';
// import { useQuery } from '@tanstack/react-query';

/** 現在はスタブ */
export const useQuestion = (qid: string, userAgent: string, acceptLanguage: string) => {
    // const configuration = new Configuration();
    // const apiInstance = new QuestionApi(configuration);

    // const {status, data} = useQuery<GetQuestionResponse>({
    //     queryKey: ["question", qid, acceptLanguage],
    //     queryFn: () => apiInstance.getQuestion(qid, userAgent, acceptLanguage).then(response => response.data)
    // })

    const status = "stub"
    const data = {
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

    return { status, data }
}