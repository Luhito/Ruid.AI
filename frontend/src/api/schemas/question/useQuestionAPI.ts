import { apiInstance } from '../../apiClient/apiClient';
import type { GetQuestion200Response } from '@gen/api';
import { useQuery } from '@tanstack/react-query';

export const useQuestionAPI = (qid: string, acceptLanguage: string) => {
    const {status, data} = useQuery<GetQuestion200Response>({
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
