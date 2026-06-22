import { Configuration } from '@/api/generated/configuration';
import { QuestionApi } from '@/api/generated/api';
import type { GetQuestionResponse } from '@/api/generated/api';
import { useQuery } from '@tanstack/react-query';

export const useQuestion = (qid: string, acceptLanguage: string) => {
    const configuration = new Configuration();
    const apiInstance = new QuestionApi(configuration);

    const {status, data} = useQuery<GetQuestionResponse>({
        queryKey: ["question", qid, acceptLanguage],
        queryFn: () => apiInstance.getQuestion(qid, acceptLanguage).then(response => response.data)
    })

    // console.log(data)

    return { status, data }
}