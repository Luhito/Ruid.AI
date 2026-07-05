import { Configuration } from 'gen/configuration';
import { QuestionApi } from 'gen/api';
import type { GetQuestionResponse } from 'gen/api';
import { useQuery } from '@tanstack/react-query';

export const useQuestion = (qid: string, acceptLanguage: string) => {
    const configuration = new Configuration();
    const apiInstance = new QuestionApi(configuration);

    const {status, data} = useQuery<GetQuestionResponse>({
        queryKey: ["question", qid, acceptLanguage],
        queryFn: () => apiInstance.getQuestion(qid, {
            headers: {
                "Accept-Language": acceptLanguage,
            },
        }).then(response => response.data)
    })

    // console.log(data);

    return { status, data }
}
