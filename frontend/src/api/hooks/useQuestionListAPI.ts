import { apiInstance } from '../apiClient/apiClient';
import type { GetQuestionsByRoomId200ResponseInner } from '@gen/api';
import { useQuery } from '@tanstack/react-query';

export const useQuestionListAPI = (room_id: string | undefined, acceptLanguage: string) => {
    const {status, data} = useQuery<GetQuestionsByRoomId200ResponseInner[]>({
        queryKey: ["questionList", room_id, acceptLanguage],
        queryFn: () => apiInstance.room.getQuestionsByRoomId(room_id!, {
            headers: {
                "Accept-Language": acceptLanguage,
            },
        }).then(response => response.data)
    })

    // console.log(data);

    return { status, data }
}
