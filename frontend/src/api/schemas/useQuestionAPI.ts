import { apiInstance } from '../apiClient/apiClient';
import type { GetQuestion200Response } from '@gen/api';
import { useQuery } from '@tanstack/react-query';

export const useQuestionAPI = (question_id: string, acceptLanguage: string) => {
    const {status, data} = useQuery<GetQuestion200Response>({
        queryKey: ["question", question_id, acceptLanguage],
        queryFn: () => apiInstance.question.getQuestion(question_id, {
            headers: {
                "Accept-Language": acceptLanguage,
            },
        }).then(response => response.data)
    })

    // console.log(data);

    return { status, data }
}
