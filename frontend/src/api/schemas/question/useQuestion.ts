import { Configuration } from '@/api/generated/configuration';
import { QuestionApi } from '@/api/generated/api';
import type { GetQuestionResponse } from '@/api/generated/api';
import { useQuery } from '@tanstack/react-query';

export const useQuestion = (qid: string, userAgent: string, acceptLanguage: string) => {
    const configuration = new Configuration();
    const apiInstance = new QuestionApi(configuration);

    const {status, data} = useQuery<GetQuestionResponse>({
        queryKey: ["question", qid, acceptLanguage],
        queryFn: () => apiInstance.getQuestion(qid, userAgent, acceptLanguage).then(response => response.data)
    })

    console.log(`${status}, ${data}`)

    return { status, data }
}