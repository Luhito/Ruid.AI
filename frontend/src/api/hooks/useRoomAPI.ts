import { apiInstance } from '../apiClient/apiClient';
import type { GetRoom200Response } from '@gen/api';
import { useQuery } from '@tanstack/react-query';

export const useRoomAPI = (room_id: string | undefined, acceptLanguage: string) => {
    const {status, data} = useQuery<GetRoom200Response>({
        queryKey: ["room", room_id, acceptLanguage],
        queryFn: () => apiInstance.room.getRoom(room_id!, {
            headers: {
                "Accept-Language": acceptLanguage,
            },
        }).then(response => response.data)
    })

    // console.log(data);

    return { status, data }
}
